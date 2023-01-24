'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

// /componenets
import SolidSvg from '@/components/SolidSVG';

// constant
import { App_Skills } from '../constants';

// motion
import { motion } from 'framer-motion';
import { fadeIn, slideIn, staggerContainer, textVariant } from '../utils/motion';


const Tryit = () => {
  const vpRefs = useRef<(HTMLDivElement)[]>([]);
  const wavesContainer = useRef<HTMLDivElement>(null);

  function getHeight() {
    console.log( 'document.body.scrollHeight');
    console.log( document.body.scrollHeight);
    
    let containerHeight = wavesContainer.current!.offsetHeight;
    let limit = containerHeight / 8;
    let maxHeight = containerHeight / 2;
  
    return Math.floor(Math.random() * (maxHeight - limit)) + limit;
  }
  
  function equalizer(bar:HTMLDivElement) {
    var height = getHeight();
    console.log('height');
    console.log(height);
    
    var timing = height * 5;
    bar.animate(
      [
        { height: bar.offsetHeight + 'px' },
        { height: `${height}px` },
      ],
      {
        duration: timing,
        fill: 'forwards',
        easing: 'ease-in-out',
        iterations: 1,
      }
    ).onfinish = () => equalizer(bar);
  }

  useEffect(() => {
    vpRefs.current.forEach((vpRefs) => {
      equalizer(vpRefs);
    });
  }, []);

  return (
    <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        ref={wavesContainer} className={`${styles.flexCenter} relative w-full lg:h-[700px] p-8 pb-0 flex-col gap-16 overflow-hidden `} >
        
        <div className={`${styles.flexCenter} flex-col relative w-full lg:w-1/2 `} >
            <motion.h1 
            variants={textVariant(0.7)} className={` ${styles.h1Section} text-primary-color-77 dark:text-primary-color-53 text-center mb-0`}>Try the app now</motion.h1 >
            <motion.p 
            variants={textVariant(0.8)}
            className={`  ${styles.Paragraph} text-center text-lg`}>
                Live on <Link href={'/player'} className={` text-primary-color-77 font-bold underline`}>YukiRythem/player</Link>
            </motion.p>
            <motion.p
            variants={textVariant(0.8)}
            className={`  ${styles.Paragraph} text-center`}>The ultimate music and podcast bot that makes it easy to search and listen to your favourite songs and podcasts, even if you can&apos;t remember the name.</motion.p>
            
            <motion.button 
            variants={textVariant(1)}
            className='cta-primary'>
              <Link href={'/player'} >Try YUKIRYTHEM now</Link>
            </motion.button>
            
        </div>

        <motion.div
        variants={fadeIn('down', 'spring', 0, 1.3)}
        className=' h-full overflow-hidden'>
          {Array.from({length: 70}, (_, i) => (
            <div className=' inline-block py-0 px-2' key={i} >
              <div className=' w-3 rounded-t-sm absolute bottom-0 bg_gradient1 bg-cover bg-center bg-fixed' ref={(el) => el && (vpRefs.current[i] = el)}></div>
            </div>
          ))}
        </motion.div>
    </motion.section>
  )
}

export default Tryit;