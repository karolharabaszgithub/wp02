import Head from 'next/head';
import { print } from 'graphql';
import gql from 'graphql-tag';

import axios from '../lib/axios';
import styles from '../styles/Home.module.css';
import Post from '../components/Post';

export default function Home({ error, posts }) {
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js & Wordpress Dynamic</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Headless Wordpress</h1>

        <p className={styles.description}>
          Next.js with dynamic data from Wordpress (fetching on each request)
          <br />
          Request time in app logs
        </p>

        <div className={styles.grid}>
          {posts.map(({ id, title, url, content, featuredImage }) => {
            const thumbnail = featuredImage.node.mediaDetails.sizes.find(
              ({ name }) => name === 'thumbnail'
            );

            return (
              <Post
                key={id}
                url={url}
                title={title}
                content={content}
                imgUrl={thumbnail.sourceUrl}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

const QUERY_POSTS = gql`
  query QueryPosts {
    posts {
      nodes {
        id
        content
        title
        slug
        featuredImage {
          node {
            mediaDetails {
              sizes {
                sourceUrl
                name
              }
            }
          }
        }
      }
    }
  }
`;

export async function getServerSideProps() {
  try {
    const response = await axios.post(process.env.GRAPHQL_API_URL, {
      query: print(QUERY_POSTS),
    },{timeout: 6000});

    return {
      props: {
        posts: response.data.data.posts.nodes,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      props: { error: ' Error during fetching data. Please check the logs.' },
    };
  }
}
