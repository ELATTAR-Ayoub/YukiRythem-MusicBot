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

interface NavProps {
  mode: 'sm' | 'md',
  ref?: React.RefObject<HTMLElement>
}

const ProfileNav: React.FC<NavProps> = ({ mode = "md" }, {ref}) => {

    const { user, logout } = useAuth()  

  const Profile_menu = [
    {
      title: "Profile",
      path: `/profile/${user.ID}`,
      iconPath: "/profile.svg"
    },
    {
      title: "My Collections",
      path: `/profile/${user.ID}/collections`,
      iconPath: "/collections.svg"
    },
    {
      title: "My Loved songs",
      path: `/profile/${user.ID}/loved-songs`,
      iconPath: "/loved-songs.svg"
    },
    {
      title: "My Loved collections",
      path: `/profile/${user.ID}/loved-collections`,
      iconPath: "/loved-collections.svg"
    }
  ]


    function toggleProfileMenu() {
        const profileMenu = document.getElementById("profile_menu_ref");
        if (profileMenu) {
          if (profileMenu.style.height === "0px" || profileMenu.style.height === "") {
            profileMenu.style.height = "auto";
            profileMenu.style.overflow = "visible";
            return;
          } else {
              profileMenu.style.height = "0px";
              profileMenu.style.overflow = "hidden";
              return;
          }
        }
        
    }

    const router = useRouter();

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
      <div  className={` ${mode == 'md' ? 'w-64' :  'w-full ' }  relative ${styles.flexStart} flex-col gap-8 p-2 rounded `} >
            <div onClick={toggleProfileMenu} className={` ${styles.flexBetween} w-full gap-8 text-secondary-color dark:text-primary-color-4 hover:bg-gray-100 dark:hover:bg-gray-200 hover:text-primary-color-4 p-2 rounded`}>
              <div className={` ${styles.flexEnd} gap-2 `}>
                <div className='w-12 h-12 rounded-full overflow-hidden bg-white'>
                  <img className=' w-full h-full object-cover ' src={user.avatar} alt="user_avatar" />
                </div>
                <div 
                className={` ${mode == 'md' ? 'w-24' :  ' w-3/4' } relative flex justify-center items-start flex-col text-sm overflow-hidden`} >
                  <div className=' font-bold'>
                    {user.userName}
                  </div>
                  <div className={`relative ${stylescss.elleipsAfterFirstLine}`}>
                    {user.email}
                  </div>
                </div>
              </div>
  
              <SolidSvg width={'18px'} height={'18px'} className={'SVGW2B scale-75'} color={'#DAE3E5 '} path={'/arrow-down.svg'} />
            </div>
  
  
            <div id={'profile_menu_ref'}
            className={` ${mode == 'md' ? 'top-24' :  'bottom-24 ' } ${styles.flexStart} flex-col absolute w-full transition-all duration-300 left-0 text-primary-color-4 bg-gray-100 rounded h-0 z-[51] overflow-hidden shadow-md`} >
              <div className={`${styles.flexCenter} flex-col relative w-full gap-4 p-4`}>
                <ul className={` ${styles.flexStart} flex-col list-none w-full gap-2 `}>
                  {Profile_menu.map(({ title, path, iconPath }) => (
                    <li key={title} className={`${pathname === path ? 'font-bold bg-primary-color-77' : ''} ${styles.flexStart} gap-2 transition-all duration-200 hover:bg-gray-200 px-4 py-2 w-full rounded`}>
                      <div className={` ${styles.flexCenter} w-6 h-6 rounded-full`}>
                        <SolidSvg width={'24px'} height={'24px'} className={' z-10 scale-[0.7]'} color={'#04080F'} path={iconPath} />
                      </div>
                      <Link href={path} className='w-full h-full'>{title}</Link>
                    </li>
                  ))}
                </ul>
  
                <div className='w-full h-[2px] bg-gray-200 opacity-50'></div>
  
                <button onClick={logoutEmail} className=' w-full p-1 bg-red-500 hover:bg-red-400 text-secondary-color rounded'>
                    Logout
                </button>
              </div>
              
            </div>
            
          </div>
    )
  }

export default ProfileNav;