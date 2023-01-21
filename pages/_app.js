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
          <div className={`flex justify-center items-center relative bg-primary-color-4 w-full h-full dark:bg-secondary-color viewHeight`}>
            <div className={`${styles.innerWidth} flex justify-center items-center w-full h-full flex-col relative`} >
              <Header/>
              <NavMenu/>
              <div className={`2xl:max-w-[1440px] w-full `}>
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </Provider>
      </ThemeProvider>
    )
  }

export default MyApp;