import '../app/globals.css'
import styles from '../styles';

export default function MyApp({ Component, pageProps }) {
    return (
      <div className={`${styles.innerWidth} bg-primary-color-4 min-h-screen`}>
        <Component {...pageProps} />
      </div>
    )
  }