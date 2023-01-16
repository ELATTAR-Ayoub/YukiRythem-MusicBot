import '../app/globals.css'
import styles from '../styles';

// redux
import { wrapper } from "../store/store";

function MyApp({ Component, pageProps }) {
    return (
      <div className={`${styles.innerWidth} relative bg-primary-color-4 min-h-screen`}>
          <Component {...pageProps} />
      </div>
    )
  }

export default wrapper.withRedux(MyApp);