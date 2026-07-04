const PRIMARY = "https://vercel-lab-nextjs-site.vercel.app";
const FALLBACK = "https://lab-nextjs-site-mirror.pages.dev";
const TIMEOUT_MS = 4000;

async function fetchOrigin(origin, request, url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(origin + url.pathname + url.search, {
      method: request.method,
      headers: request.headers,
      signal: controller.signal,
    });
    // >=400, not just >=500: an unassigned Vercel alias returns 404, not 5xx.
    if (res.status >= 400) {
      throw new Error(`origin responded with ${res.status}`);
    }
    return res;
  } finally {
    clearTimeout(timeout);
  }
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const simulatePrimaryDown = url.searchParams.get("simulate") === "primary-down";

    let res;
    let servedBy;
    try {
      if (simulatePrimaryDown) {
        throw new Error("primary failure simulated for testing");
      }
      res = await fetchOrigin(PRIMARY, request, url);
      servedBy = "primary";
    } catch {
      res = await fetchOrigin(FALLBACK, request, url);
      servedBy = "fallback";
    }

    const headers = new Headers(res.headers);
    headers.set("x-lab-served-by", servedBy);
    return new Response(res.body, { status: res.status, headers });
  },
};
