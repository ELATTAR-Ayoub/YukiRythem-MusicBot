'use client'

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

const Loader = () => {

  return (
    <div className={` ${styles.flexCenter}  absolute top-0 left-0 w-full h-full bg-primary-color-4 opacity-50 z-20`}>
        <div className={`${stylescss.circleLoading}`}></div>
        <div className={`${stylescss.circleLoading}`}></div>
        <div className={`${stylescss.circleLoading}`}></div>
        <div className={`${stylescss.circleLoading}`}></div>
        <div className={`${stylescss.circleLoading}`}></div>
        <div className={`${stylescss.circleLoading}`}></div>
        <div className={`${stylescss.circleLoading}`}></div>
        <div className={`${stylescss.circleLoading}`}></div>
        <div className={`${stylescss.circleLoading}`}></div>
    </div>
  );
};

export default Loader;