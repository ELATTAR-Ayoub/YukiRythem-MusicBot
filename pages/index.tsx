'use client'

import Image from 'next/image'
import Link from 'next/link'

// styles
import styles from '../styles/index';
import stylescss from '../styles/page.module.css';

export default function Home() {
  return (
    <main className={`${styles.innerWidth} min-h-[90vh] w-full overflow-hidden text-primary-color-83 dark:text-primary-color-4 p-8`}>
      <h1 className=''>This app is still in production</h1>
      <p>Check the app here: <Link href='player' className=' underline text-primary-color-53'>Check the app</Link> </p>
      
    </main>
  )
}