'use client'

import './globals.css'
import { ThemeProvider } from 'next-themes';

// components
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavMenu from '../components/NavMenu'

// Firebase
import { AuthContextProvider } from '../context/AuthContext'
import { useRouter } from 'next/router'

// redux
import { store_0001 } from '../store/store';
import { Provider } from 'react-redux';

export default function RootLayout({children, ...rest}: { children: React.ReactNode }) {

  const AuthRequired = ['/collections/create', '/profile/update', ]

  return (
    <html lang="en">
      <head />
      <body className={`flex justify-center items-center flex-col relative bg-primary-color-4 w-full h-full dark:bg-secondary-color viewHeight`}>
        <AuthContextProvider>
          <ThemeProvider attribute='class'>
            <Provider store={store_0001}>
              <Header/>
              <NavMenu/>
              <div className={` 2xl:max-w-[1440px] w-full mt-[10vh] text-secondary-color dark:text-primary-color-4 `}>
                {children}
              </div>
              <Footer/>
            </Provider>
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}