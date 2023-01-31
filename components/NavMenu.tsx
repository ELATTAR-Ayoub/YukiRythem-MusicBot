import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'
import React, { useRef } from 'react';

// styles
import styles from '../styles/index';
import stylescss from '../styles/page.module.css';

// auth
import { useAuth } from '@/context/AuthContext'

// components
import LightModeBtn from './LightModeBtn.jsx';
import SolidSvg from './SolidSVG';
import ProfileNav from './ProfileNav'

const Header = () => {

  const { user } = useAuth()  

  function closeNavMenu() {
    const element = document.getElementById("navMenu");
    if (element) {
        element.style.width = '0px';
    }
  }

  const pathname = usePathname();

  return (
    <div id='navMenu' className={`fixed top-0 right-0 flex justify-start items-center flex-col lg:hidden transition-all duration-200 bg-primary-color-4 dark:bg-primary-color-83 text-primary-color-83 dark:text-primary-color-4 h-screen w-0 z-50 overflow-hidden`}>
      <div className={`relative flex justify-start items-center flex-col h-full w-full `}>
          <div className={` ${styles.flexBetween} w-full mb-10 sm:px-7 px-7 h-[10vh] activeLink before:opacity-20`}>
              <LightModeBtn />
              
              <button onClick={()=> closeNavMenu()} aria-label="close_na_menu" className=''>
                  <SolidSvg width={'24px'} height={'24px'} className={'SVGW2B'} color={'#F0F4F4'} path={'/close.svg'} />
              </button>
          </div>

          <nav className={` ${styles.flexStart} flex-col w-full gap-6 text-xl p-7 `}>
              <Link href="/" className={`${pathname === '/' ? 'activeLinksm' : 'linksm'} w-full transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color px-4 py-1`}>Home</Link>
              <Link href="/player" className={`${pathname === '/player' ? 'activeLinksm' : 'linksm'} w-full transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color px-4 py-1`}>Player</Link>
              <Link href="/collections" className={`${pathname === '/collections' ? 'activeLinksm' : 'linksm'} w-full transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color px-4 py-1`}>Collections</Link>
              { (!user.ID ) ?
                  <Link href="/signin" className={`${pathname === '/signin' ? 'activeLinksm' : 'linksm'} w-full transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color px-4 py-1`}>Sign in</Link>
                  : 
                  <></>
              }
          </nav>

          <div className={` w-full px-4 absolute bottom-0 left-0`}>
            <ProfileNav mode={'sm'} />
          </div>
        
          

          <div className=' '>
            <p>Developed with &lt;3 </p>
            <p>by ELATTAR Ayoub</p>
          </div>
      </div>
    </div>
  );
};

export default Header;