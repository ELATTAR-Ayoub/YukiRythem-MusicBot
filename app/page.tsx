'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '../styles/page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className=' bg-primary-color-4 min-h-screen overflow-hidden text-primary-color-83'>
      <h1 className=''>This app is still in production</h1>
      <p>Check the app here: </p>
      <Link href='player' className='font-bold m-5 p-3 bg-primary-color-4 text-secondary-color'>Check the app</Link> 
    </main>
  )
}
