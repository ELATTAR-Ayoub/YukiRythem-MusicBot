import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'
import React, { useRef, useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
              <div className="relative w-full">
                <button 
                  onClick={toggleDropdown} 
                  className={`${ ( pathname === '/collections/create') || ( pathname === '/collections') ? 'activeLinksm' : 'linksm'} ${styles.flexBetween} gap-2 transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color w-full px-4 py-1`}
                >
                  Collections
                  <SolidSvg width={'18px'} height={'18px'} className={'SVGW2B scale-75'} color={'#DAE3E5 '} path={'/arrow-down.svg'} />
                </button>
                {isOpen && (
                  <div className={` origin-top-right mt-2 w-full rounded-md shadow-lg text-primary-color-4 dark:text-secondary-color bg-gray-100 dark:bg-primary-color-4 `}>
                    <div className={` rounded-md shadow-xs ${styles.flexStart} flex-col list-none w-full gap-2 p-4 `}>
                      <a href="/collections" className="block p-4 py-2        text-sm sm:text-base gap-2 w-full rounded hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:bg-gray-200 dark:focus:bg-slate-700 transition duration-150 ease-in-out">Collections hub</a>
                      <a href="/collections/create" className="block p-4 py-2 text-sm sm:text-base gap-2 w-full rounded hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:bg-gray-200 dark:focus:bg-slate-700 transition duration-150 ease-in-out">Create collection</a>
                    </div>
                  </div>
                )}
              </div>
              
              
              { (!user.ID ) ?
                <>
                  <Link href="/signin" className={`${pathname === '/signin' ? 'activeLinksm' : 'linksm'} w-full transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color px-4 py-1`}>Sign in</Link>
                  <Link href="/signup" className={`${pathname === '/signup' ? 'activeLinksm' : 'linksm'} w-full transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color px-4 py-1`}>Sign up</Link>
                </>
                : 
                <div className="relative w-full">
                  <button 
                    onClick={() => {setIsProfileOpen(!isProfileOpen)}} 
                    className={`${ ( pathname === `/profile/${user.ID}`) ? 'activeLinksm' : 'linksm'} ${styles.flexBetween} gap-2 transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color w-full px-4 py-1`}
                  >
                    My Profile
                    <SolidSvg width={'18px'} height={'18px'} className={'SVGW2B scale-75'} color={'#DAE3E5 '} path={'/arrow-down.svg'} />
                  </button>
                  {isProfileOpen && (
                    <div className={` origin-top-right mt-2 w-full rounded-md shadow-lg text-primary-color-4 dark:text-secondary-color bg-gray-100 dark:bg-primary-color-4 `}>
                      <div className={` rounded-md shadow-xs ${styles.flexStart} flex-col list-none w-full gap-2 p-4 `}>
                        <a href={`/profile/${user.ID}`} className="block p-4 py-2 text-sm sm:text-base gap-2 w-full rounded hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:bg-gray-200 dark:focus:bg-slate-700 transition duration-150 ease-in-out">My profile</a>
                        <a href={`/profile/${user.ID}/collections`} className="block p-4 py-2 text-sm sm:text-base gap-2 w-full rounded hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:bg-gray-200 dark:focus:bg-slate-700 transition duration-150 ease-in-out">My collections</a>
                        <a href={`/profile/${user.ID}/loved-collections`} className="block p-4 py-2 text-sm sm:text-base gap-2 w-full rounded hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:bg-gray-200 dark:focus:bg-slate-700 transition duration-150 ease-in-out">My favorite collections</a>
                        <a href={`/profile/${user.ID}/loved-songs`} className="block p-4 py-2 text-sm sm:text-base gap-2 w-full rounded hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:bg-gray-200 dark:focus:bg-slate-700 transition duration-150 ease-in-out">My favorite songs</a>
                      </div>
                    </div>
                  )}
                </div>
              }


          </nav>

          {/* { (user.ID ) ?
                <div className={` w-full px-4 absolute bottom-0 left-0`}>
                  <ProfileNav mode={'sm'} />
                </div>
            : 
            <></>
          } */}

          <div className=' '>
            <p>Developed with &lt;3 </p>
            <p>by <Link className='link_footer' href={'https://twitter.com/EA_Krowl'}>ELATTAR Ayoub</Link></p>
          </div>
      </div>
    </div>
  );
};

export default Header;