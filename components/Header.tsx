'use client'

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

  function openNavMenu() {
    const element = document.getElementById("navMenu");
    if (element) {
      element.style.width = '66.666667%';
    }
  }

  return (
    <div className={` ${styles.flexBetween} w-full sm:px-7 px-7 h-[10vh] `}>
      <Logo />

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