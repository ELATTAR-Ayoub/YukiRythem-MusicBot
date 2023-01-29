import {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'

// auth
import { useAuth } from '@/context/AuthContext'

// styles
import styles from '../styles/index';
import stylescss from '../styles/page.module.css';

// components
import LightModeBtn from './LightModeBtn.jsx';
import Logo from './Logo';
import SolidSvg from './SolidSVG';

const Header = () => {
  const { user, logout } = useAuth()  


  const router = useRouter();
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  function openNavMenu() {
    const element = document.getElementById("navMenu");
    if (element) {
      element.style.width = '66.666667%';
    }
    console.log(user);
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

  const pathname = usePathname();

  const logoutEmail = async () => {
    console.log('start');

    try {
      console.log('start2');
      await logout();
      console.log('logout');
      console.log(user);
      router.push(`/`)
    } catch (err) {
      console.log(err)
      console.log('err in');
    }

    console.log('finished logout');
  }

  return (
    <section
      className={` ${styles.flexBetween} fixed top-0 w-full 2xl:max-w-[1440px] sm:px-7 px-7 z-40 bg-primary-color-4 dark:bg-secondary-color transition-all duration-300 overflow-hidden ${
        isScrollingUp ? " h-0" : "h-[10vh]"
      }`}
    >
      <Link href="/"><Logo /></Link>

      <div className='lg:flex flex-row-reverse gap-8 items-center hidden content-center cursor-pointer'>
        <ul className='flex items-center gap-4 list-none text-primary-color-83 dark:text-primary-color-53'>
          <li>
            <Link href="/" className={`${pathname === '/' ? ' activeLink' : ''} transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color px-4 py-1`}>Home</Link>
          </li>
          <li >
            <Link href="/player" className={`${pathname === '/player' ? ' activeLink' : ''} transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color px-4 py-1`}>Player</Link>
          </li>
          {/* <li >
            <Link href="/collections" className={`${pathname === '/collections' ? ' activeLink' : ''} transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color px-4 py-1`}>Collections</Link>
          </li> */}
          { (!user.ID ) ?
          <li >
            <Link href="/signin" className={`${pathname === '/signin' ? ' activeLink' : ''} transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color px-4 py-1`}>Sign in</Link>
          </li> : 
          <li >
            <Link href={`/profile/${user.ID}`} className={`${pathname === `/profile/${user.ID}` ? ' activeLink' : ''} transition-all duration-200 hover:bg-primary-color-53 dark:hover:bg-primary-color-4 dark:hover:text-secondary-color px-4 py-1`}>Profile</Link>
          </li>
          }
        </ul>
        <LightModeBtn />

        <button onClick={logoutEmail} className=' bg-red-600 text-secondary-color p-4'>Logout</button>
      </div>

      <div className='flex items-center lg:hidden grid-cols-2 gap-8 content-center cursor-pointer'>
        <LightModeBtn />
        <button onClick={() => openNavMenu()} className='grid content-center' aria-label="open_nav_menu">
          <SolidSvg width={'24px'} height={'24px'} className={'SVGW2B'} color={'#DAE3E5'} path={'/navMenu.svg'} />
        </button>
      </div>
    </section>
  );
};

export default Header;