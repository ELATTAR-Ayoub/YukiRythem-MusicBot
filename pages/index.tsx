'use client'

import Image from 'next/image'
import Link from 'next/link'

// styles
import styles from '../styles/index';
import stylescss from '../styles/page.module.css';

// /section
import Hero from '../sections/Hero';
import Features from '../sections/Features';

// components
import SolidSvg from '@/components/SolidSVG';

export default function Home() {
  return (
    <div className={` ${styles.flexCenter} flex-col 2xl:max-w-[1440px] min-h-[90vh] gap-28 w-full overflow-hidden text-secondary-color dark:text-primary-color-4 p-8`}>
      
      <div className={` ${styles.flexCenter} flex-col h-full gap-28 w-screen 2xl:max-w-[1440px] bg-primary-color-4`}>
        <Hero />
        <Features />
      </div>


    </div>
  )
}