'use client'

import Image from 'next/image';

// styles
import styles from '../styles/index';
import stylescss from '../styles/page.module.css';

const Header = () => {

  return (
    <div className={` ${styles.flexBetween} w-full 2xl:p-0 xl:px-32 md:px-20 sm:px-7 px-7 h-[10vh] `}>
      <div className='grid content-center cursor-pointer'>
        <Image className="w-[100px] h-[30px] object-contain relative" src="/logo.svg" alt="Logo" width={100} height={24}/>
      </div>

      <div className='lg:grid hidden content-center cursor-pointer'>
        <p>s</p>
      </div>

      <div className='grid lg:hidden content-center cursor-pointer'>
        <Image className="w-[24px] h-[24px] object-contain relative" src="/navMenu.svg" alt="navMenu" width={24} height={24}/>
      </div>
    </div>
  );
};

export default Header;