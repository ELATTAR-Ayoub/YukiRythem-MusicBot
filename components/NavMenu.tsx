'use client'

import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useRef } from 'react';

// styles
import styles from '../styles/index';
import stylescss from '../styles/page.module.css';

// components
import LightModeBtn from './LightModeBtn.jsx';
import SolidSvg from './SolidSVG';

const Header = () => {
  const router = useRouter();
  const navMenu = useRef(null);

  function closeNavMenu() {
    const element = document.getElementById("navMenu");
    if (element) {
        element.style.width = '0px';
    }
  }

  return (
    <div id='navMenu' className={`absolute flex justify-start items-center flex-col lg:hidden transition-all duration-200 top-0 right-0 bg-primary-color-4 dark:bg-primary-color-83 text-primary-color-83 dark:text-primary-color-4 h-screen w-0 z-30 overflow-hidden`}>
        <div className={` ${styles.flexBetween} w-full mb-10 p-7 pt-7 activeLink before:opacity-20`}>
            <LightModeBtn />
            
            <button onClick={()=> closeNavMenu()} aria-label="close_na_menu" className=''>
                <SolidSvg width={'24px'} height={'24px'} className={'SVGW2B'} color={'#F0F4F4'} path={'/close.svg'} />
            </button>
        </div>

        <nav className={` ${styles.flexStart} flex-col w-full gap-6 text-xl p-7 `}>
            <Link href="/" className={`${router.pathname === '/' ? 'activeLinksm' : 'linksm'} w-full transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color px-4 py-1`}>Home</Link>
            <Link href="/player" className={`${router.pathname === '/player' ? 'activeLinksm' : 'linksm'} w-full transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color px-4 py-1`}>Player</Link>
        </nav>
      
        

        <div className=' '>
          <p>Developed with &lt;3 by ELATTAR Ayub</p>
        </div>
    </div>
  );
};

export default Header;