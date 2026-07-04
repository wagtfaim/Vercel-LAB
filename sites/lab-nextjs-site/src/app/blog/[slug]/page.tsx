import Link from "next/link";
import { notFound } from "next/navigation";

const POSTS: Record<string, string> = {
  "primeiro-post": "Este é o conteúdo do primeiro post do Lab.",
  "segundo-post": "Este é o conteúdo do segundo post do Lab.",
};

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = POSTS[slug];

  if (!content) {
    notFound();
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>{slug}</h1>
      <p>{content}</p>
      <Link href="/">Voltar</Link>
    </main>
  );
}
