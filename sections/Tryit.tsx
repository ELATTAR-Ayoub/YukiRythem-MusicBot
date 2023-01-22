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
    <div ref={wavesContainer} className={`${styles.flexCenter} relative w-full lg:h-[700px] p-8 pb-0 flex-col gap-16 overflow-hidden `} >
        <div className={`${styles.flexCenter} flex-col relative w-full lg:w-1/2 `} >
            <h1 className={` ${styles.h1Section} text-primary-color-77 dark:text-primary-color-53 text-center mb-0`}>Try the app now</h1>
            <p className={`  ${styles.Paragraph} text-center text-lg`}>
                Live on <Link href={'/player'} className={` text-primary-color-77 font-bold underline`}>YukiRythem/player</Link>
            </p>
            <p className={`  ${styles.Paragraph} text-center`}>The ultimate music and podcast bot that makes it easy to search and listen to your favourite songs and podcasts, even if you can&apos;t remember the name.</p>
            <Link href={'/player'} className='cta-primary'>Try YUKIRYTHEM now</Link>
        </div>

        <div className=' h-full overflow-hidden'>
          {Array.from({length: 70}, (_, i) => (
            <div className=' inline-block py-0 px-2' key={i} >
              <div className=' w-3 rounded-t-sm absolute bottom-0 bg_gradient1 bg-cover bg-center bg-fixed' ref={(el) => el && (vpRefs.current[i] = el)}></div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Tryit;