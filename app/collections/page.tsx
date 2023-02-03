'use client';

import { useAuth } from '@/context/AuthContext'

// styles
import styles from '../../styles';
import stylescss from '../../styles/page.module.css';

// route
import { useRouter } from 'next/navigation';
  
export default function ProfilePage()  {

    return (
        <section className={` ${styles.flexCenter} flex-col`}>
            <h1 className={` ${styles.h1Section}  w-full text-center`}>We are still working on this page i swear!!</h1>
            <img className='' alt='Dont read this' src='https://i.pinimg.com/originals/9e/a4/f3/9ea4f3a0e0f5948f5b649b9eeba1816a.jpg'></img>
        </section>
    );
}