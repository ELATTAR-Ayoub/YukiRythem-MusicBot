'use client';

import Image from 'next/image';
import Link from 'next/link';

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

// /componenets
import SolidSvg from '@/components/SolidSVG';

export default function Hero() {
  return (
    <div className={` ${styles.flexBetween} w-full p-8 flex-col text-secondary-color bg-primary-color-4 gap-16 lg:flex-row `}>
    <div className='relative w-full lg:w-2/3 '>
        <h1 className='z-10 relative text-5xl sm:text-7xl w-full font-bold leading-[65px] sm:leading-[75px] text-secondary-color my-6'> <span className='gradient1'>Discover</span> Music and Podcasts like Never Before </h1>
        <p className='z-10 relative text-base sm:text-xl w-full text-secondary-color my-6'>{"The ultimate music and podcast bot that makes it easy to search and listen to your favourite songs and podcasts, even if you can't remember the name."}</p>
        <div className={`relative ${styles.flexStart} gap-6 flex-col sm:flex-row z-10`}>
            <Link href="/player" className='cta-primary'>Try YUKIRYTHEM now</Link>
            <Link href="#learn_more" className='cta-secondary'>Learn more</Link>
        </div>
        <div className='absolute right-0 top-1/2 -translate-x-1/2 z-0 rotateInfinite'>
          <SolidSvg width={'92px'} height={'92px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/triangle.svg'} />
        </div>
    </div>
    <div className='relative w-screen lg:w-2/3 lg:left-12 xl:left-0'>
        <Image
        className='w-full'
        src="/hero_picture.jpg"
        alt="Picture of the author"
        width={500}
        height={500}
        />

        <div className='absolute left-2/3 -top-8 -translate-x-1/2 rotateInfinite delay-500 z-20'>
          <SolidSvg width={'92px'} height={'92px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/triangle_empty.svg'} />
        </div>
    </div>
</div>
  )
}