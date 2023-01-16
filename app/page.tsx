'use client'

import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className=' bg-primary-color-4 min-h-screen overflow-hidden'>
      <h1 className=' text-orange-600'>Home</h1>
    </main>
  )
}
