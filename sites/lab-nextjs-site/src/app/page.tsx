import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Lab: Vercel Migration Pipeline</h1>
        <p>
          Site estático de teste usado para validar o pipeline de recuperação,
          espelhamento e failover entre a Vercel e uma cloud alternativa.
        </p>
        <ul>
          <li>
            <Link href="/about">Sobre o Lab</Link>
          </li>
          <li>
            <Link href="/blog/primeiro-post">Blog: primeiro-post</Link>
          </li>
          <li>
            <Link href="/blog/segundo-post">Blog: segundo-post</Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
