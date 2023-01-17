'use client'

import Link from 'next/link';
import { useRouter } from 'next/router'

// styles
import styles from '../styles/index';
import stylescss from '../styles/page.module.css';

// components
import LightModeBtn from './LightModeBtn.jsx';
import SolidSvg from './SolidSVG';

const Header = () => {
  const router = useRouter()

  return (
    <div className={`absolute flex justify-between items-center flex-col lg:hidden top-0 right-0 bg-primary-color-4 text-primary-color-83 p-8 h-screen w-2/3 z-30 `}>
        <div className=' w-full '>
            <LightModeBtn />

            <SolidSvg width={'24px'} height={'24px'} color={'#F0F4F4'} path={'/close.svg'} />
        </div>
      
        <div className='flex gap-8 items-center content-center cursor-pointer w-full' >
            <ul className='flex flex-col items-center gap-10 list-none text-primary-color-83 dark:text-primary-color-53 w-full h-full'>
            <li>
                <Link href="/" className={`${router.pathname === '/' ? ' activeLink' : ''} transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color px-4 py-1`}>Home</Link>
            </li>
            <li >
                <Link href="/player" className={`${router.pathname === '/player' ? ' activeLink' : ''} transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color px-4 py-1`}>Player</Link>
            </li>
            </ul>
        </div>

        <div></div>
    </div>
  );
};

export default Header;