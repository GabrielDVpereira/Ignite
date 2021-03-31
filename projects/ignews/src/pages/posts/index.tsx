import styles from "./styles.module.scss";
import Head from "next/head";
import { GetStaticProps } from "next";
import { getPrismiClient } from "../../services/prismic";
import Prismic from "@prismicio/client";

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

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismiClient();
  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    {
      fetch: ["Post.title", "Post.content"],
      pageSize: 100,
    }
  );

  console.log(JSON.stringify(response, null, 2));
  return {
    props: {},
  };
};
