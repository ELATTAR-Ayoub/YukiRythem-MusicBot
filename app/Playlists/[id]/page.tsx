'use client'

// styles
import styles from '@/styles';
import stylescss from '@/styles/page.module.css';

export default async function Playlists_id({ params }: any) {

  return (
    <div className={` ${styles.flexCenter}`}>
       <h1>Playlists</h1>
       <p>{params.id}</p>
    </div>
  );
};
