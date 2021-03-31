import styles from "./styles.module.scss";
import Head from "next/head";
export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor,
              facilis!
            </p>
          </a>
          <a>
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor,
              facilis!
            </p>
          </a>
          <a>
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor,
              facilis!
            </p>
          </a>
          <a>
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor,
              facilis!
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
