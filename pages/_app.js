'use client'

import '../app/globals.css'
import styles from '../styles/index';
import { ThemeProvider } from 'next-themes';

// components
import Header from '../components/Header';
import NavMenu from '../components/NavMenu'

// redux
import { wrapper } from "../store/store.ts";
import { Provider } from "react-redux";

const MyApp = ({Component, pageProps, ...rest}) => {
  const {store, props} = wrapper.useWrappedStore(rest);
    return (
      <ThemeProvider attribute='class'>
        <Provider store={store}>
          <div className={`flex justify-center items-center relative bg-primary-color-4 dark:bg-secondary-color viewHeight`}>
            <div className={`${styles.innerWidth} flex justify-center items-center w-full flex-col relative`}>
              <Header/>
              <NavMenu/>
              <Component {...pageProps} />
            </div>
          </div>
        </Provider>
      </ThemeProvider>
    )
  }

export default MyApp;