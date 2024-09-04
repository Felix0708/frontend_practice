// src/app/scraps/ScrapPage.tsx
import { useScrapStore } from '../../store/scrapStore';
import * as styles from './scraps.css';

const ScrapPage = () => {
  const { photos, videos } = useScrapStore(); // zustand 훅에서 스크랩된 사진과 비디오 가져오기

  return (
    <div>
      <h1 className={styles.title}>Scrapped Items</h1>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Scrapped Photos</h2>
        <div className={styles.grid}>
          {photos.map((scrap) => (
            <div key={scrap.id} className={styles.card}>
              <img
                src={scrap.data.src.medium}
                alt={scrap.data.photographer}
                className={styles.image}
              />
              <p className={styles.text}>{scrap.data.photographer}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Scrapped Videos</h2>
        <div className={styles.grid}>
          {videos.map((scrap) => (
            <div key={scrap.id} className={styles.card}>
              <video
                src={scrap.data.src.medium}
                controls
                className={styles.video}
              />
              <p className={styles.text}>{scrap.data.photographer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ScrapPage;