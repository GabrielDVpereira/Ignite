import { GetStaticPaths, GetStaticProps } from "next";
import { RichText } from "prismic-dom";
import { getPrismiClient } from "../../../services/prismic";
import Head from "next/head";
import styles from "../post.module.scss";
import Link from "next/link";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostPreviewProps) {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Link href="/">
            <div className={styles.continueReading}>
              Wanna keep reading?
              <a> Subscribe now 🤗</a>
            </div>
          </Link>
        </article>
      </main>
    </>
  );
}

// this function return the paths that will be generated during the build
// It's mandatory pass it because we have [params] on our path
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking", // can be a boolean
    // Fallback - if the content is not loaded by static build
    // true - fetch the page request on the browser
    // false  - return a 404
    // blocking - fetch the page request on the server and block the browser until it resolves
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismiClient();

  const response = await prismic.getByUID("post", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: { post },
    revalidate: 60 * 30,
  };
};
