'use client';

import Image from 'next/image';
import Link from 'next/link';

// styles
import styles from '../styles';

// auth
import { useAuth } from '@/context/AuthContext'

// /componenets
import SolidSvg from '@/components/SolidSVG';

// motion
import { motion } from 'framer-motion';
import { fadeIn, slideIn, slideInRotating, staggerContainer, textVariant } from '../utils/motion';

interface HeroProps {
  mode: 'light' | 'dark',
  ref?: React.RefObject<HTMLElement>
}

const Hero: React.FC<HeroProps> = ({ mode = "light" }, {ref}) => {
  const { user } = useAuth()  
  
  return (
    <motion.section ref={ref}
    variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{ once: (mode == 'dark' ? true : false), amount: 0.25 }}
    className={` ${mode == 'light' ?
     'text-secondary-color bg-primary-color-4' : 
     'text-primary-color-4 bg-secondary-color'
    } 
      ${styles.flexBetween} relative 2xl:max-w-[1440px] w-screen p-8 flex-col gap-16 lg:flex-row overflow-hidden 
    `} >

    <motion.div 
        className='relative w-full h-full lg:w-2/3 '>
        <motion.h1
          variants={textVariant(0.7)}
         className='z-10 relative text-5xl sm:text-7xl w-full font-bold leading-[60px] sm:leading-[75px] my-6'> <span className='gradient1'>Discover</span> Music and Podcasts like Never Before </motion.h1>
        <motion.p
        variants={textVariant(0.8)}
        className='z-10 relative text-lg sm:text-xl w-full my-6'>{"The ultimate music and podcast bot that makes it easy to search and listen to your favourite songs and podcasts, even if you can't remember the name."}</motion.p>
        <motion.div 
        variants={fadeIn('left', 'spring', 0.5, 2)}
        className={`relative ${styles.flexStart} gap-6 flex-col sm:flex-row z-10`}>
            <Link href="/player" className='cta-primary'>Try YUKIRYTHEM now</Link>
            { (!user.ID ) ?
                  <Link href="/signup" className={`${mode == 'light' ? 'cta-secondary' : 'cta-secondary-dark'}`}>Login for free</Link>
                  : 
                  <Link href="/collections/create" className={`${mode == 'light' ? 'cta-secondary' : 'cta-secondary-dark'}`}>Create a collection</Link>
            }
        </motion.div>
        
        <motion.div
        variants={slideInRotating('left', 'spring', 0, 2)}
        className='absolute right-0 top-1/2 '>
          
          <SolidSvg width={'92px'} height={'92px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/triangle.svg'} />
        
        </motion.div>
    </motion.div>

    <motion.div 
    variants={slideIn('left', 'spring', 0, 1.3)}
    className='relative w-screen lg:w-2/3 lg:left-12 xl:left-0'>
        <Image
        className={`${mode == 'light' ? ' ' : 'b_and_w'} w-full`}
        src="/hero_picture.jpg"
        alt="Picture of the author"
        width={500}
        height={500}
        />

        <div className='absolute left-2/3 -top-2 -translate-x-1/2 rotateInfinite delay-500 z-20'>
          <SolidSvg width={'92px'} height={'92px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/triangle_empty.svg'} />
        </div>
    </motion.div>

    <div className={` ${styles.flexCenter} flex-col absolute left-1/2 -translate-x-1/2 bottom-2 `}>
      <span
      className={` ${mode == 'light' ?
      'border-secondary-color ' : 
      ' border-primary-color-4'
      } 
      relative rounded-full border-2  w-4 h-12 `} >
        <span 
        className={` ${mode == 'light' ?
          'bg-secondary-color ' : 
          ' bg-primary-color-4'
          } 
          absolute w-2 h-2 rounded-full mouse  `} >
        </span>
      </span>
      <div className=' text-sm md:text-base mt-2'>Scroll down</div>
    </div>
</motion.section>
  )
}

export default Hero;