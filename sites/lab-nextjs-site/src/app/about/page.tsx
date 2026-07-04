import Link from "next/link";

export default function About() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Sobre o Lab</h1>
      <p>
        Esta página existe apenas para validar que rotas estáticas adicionais
        são recuperadas e espelhadas corretamente pelo pipeline.
      </p>
      <Link href="/">Voltar</Link>
    </main>
  );
}
