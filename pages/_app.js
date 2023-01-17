import '../app/globals.css'
import styles from '../styles/index';

// components
import Header from '../components/Header';

// redux
import { wrapper } from "../store/store";

function MyApp({ Component, pageProps }) {
    return (
      <div className={`${styles.flexCenter} relative w-screen bg-primary-color-4 min-h-screen`}>
        <div className={`${styles.innerWidth} ${styles.flexCenter} w-full flex-col relative h-full`}>
          <Header/>
          <Component {...pageProps} />
        </div>
      </div>
    )
  }

export default wrapper.withRedux(MyApp);