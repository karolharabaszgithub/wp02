import stripHtml from 'string-strip-html';

import styles from './Post.module.css';

export default function Post({ url, title, content, imgUrl }) {
  return (
    <a href={url} className={styles.card}>
      <img className={styles.image} src={imgUrl} />
      <h3>{title}</h3>
      <p>{stripHtml(content).result.substring(0, 200)}</p>
    </a>
  );
}
