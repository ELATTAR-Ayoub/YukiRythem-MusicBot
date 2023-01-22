'use client'

import {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'

// styles
import styles from '../styles/index';
import stylescss from '../styles/page.module.css';

// components
import LightModeBtn from './LightModeBtn.jsx';
import Logo from './Logo';
import SolidSvg from './SolidSVG';

const Header = () => {
  const router = useRouter();
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  function openNavMenu() {
    const element = document.getElementById("navMenu");
    if (element) {
      element.style.width = '66.666667%';
    }
  }

  useEffect(() => {
    function handleScroll() {
      const currentScrollTop = window.pageYOffset;
      if (currentScrollTop < lastScrollTop) {
        setIsScrollingUp(false);
      } else {
        setIsScrollingUp(true);
      }
      setLastScrollTop(currentScrollTop);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div
      className={` ${styles.flexBetween} fixed top-0 w-full 2xl:max-w-[1440px] sm:px-7 px-7 z-40 bg-primary-color-4 dark:bg-secondary-color transition-all duration-300 overflow-hidden ${
        isScrollingUp ? " h-0" : "h-[10vh]"
      }`}
    >
      <Link href="/"><Logo /></Link>

      <div className='lg:flex flex-row-reverse gap-8 items-center hidden content-center cursor-pointer'>
        <LightModeBtn />
        <ul className='flex items-center gap-4 list-none text-primary-color-83 dark:text-primary-color-53'>
          <li>
            <Link href="/" className={`${router.pathname === '/' ? ' activeLink' : ''} transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color px-4 py-1`}>Home</Link>
          </li>
          <li >
            <Link href="/player" className={`${router.pathname === '/player' ? ' activeLink' : ''} transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color px-4 py-1`}>Player</Link>
          </li>
        </ul>
      </div>

      <div className='flex items-center lg:hidden grid-cols-2 gap-8 content-center cursor-pointer'>
        <LightModeBtn />
        <button onClick={() => openNavMenu()} className='grid content-center' aria-label="open_nav_menu">
          <SolidSvg width={'24px'} height={'24px'} className={'SVGW2B'} color={'#DAE3E5'} path={'/navMenu.svg'} />
        </button>
      </div>
    </div>
  );
};

export default Header;