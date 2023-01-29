/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState, useEffect } from 'react'

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from "next-themes";

// auth
import { useAuth } from '@/context/AuthContext'

// styles
import styles from '../../styles';
import stylescss from '../../styles/page.module.css';

// route
import { useRouter } from 'next/navigation';

export default function Page() {
    const { user, signin } = useAuth()
    const router = useRouter();

  // inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (!event.target.value.includes("@") || !event.target.value.includes(".")) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (event.target.value.length < 5 || event.target.value.length > 30 || !event.target.value.match(/[A-Z]/) || !event.target.value.match(/[a-z]/) || !event.target.value.match(/[0-9]/)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }


  const signinEmail = async (event: React.MouseEvent<HTMLButtonElement>  | React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('start');

    try {
      await signin(email, password);
      console.log('signed in');
      router.push('/')
    } catch (err) {
      console.log(err)
      console.log('err in');
    }

    console.log('finished in');
  }

  return (
    <section className={`${styles.flexCenter} flex-col  text-secondary-color dark:text-primary-color-4 bg-primary-color-4 dark:bg-secondary-color relative w-full `}>
      <div className={`${styles.flexCenter} flex-col w-full sm:max-w-[675px]  p-8 gap-8 mb-6 `}>
        <div className={`${styles.flexStart} relative w-full flex-col`}>
            <h1 className={` ${styles.h1Section} text-center mb-0`}>Welcome back to <span className='gradient1'>YukiRythem</span>  </h1>
            <p className={`  ${styles.Paragraph} text-center `}>Access your account and start discovering new music and podcasts today!</p>
        </div>

        <div className={`${styles.flexStart} relative w-4/5 flex-col gap-4 text-base dark:text-secondary-color text-primary-color-4`}>
            <button className={`${styles.flexCenter} relative w-full gap-8  dark:bg-primary-color-4 bg-secondary-color font-semibold p-4 rounded-md hover:scale-105 transition-all duration-300 `}>
            <Image className="w-[24x] h-[24x] object-contain relative" src="/facebook_color.svg" alt="facebook_signup" width={24} height={24}/> 
            Sign in with facebook
            </button>
            <button className={`${styles.flexCenter} relative w-full gap-[50px] dark:bg-primary-color-4 bg-secondary-color font-semibold p-4 rounded-md hover:scale-105 transition-all duration-300 `}>
            <Image className="w-[24x] h-[24x] object-contain relative" src="/google_color.svg" alt="google_signup" width={24} height={24}/> 
            Sign in with google
            </button>
        </div>

        <div className={`${styles.flexCenter} relative w-full gap-2`}>
            <div className='w-full h-[2px] bg-secondary-color dark:bg-primary-color-4 rounded-xl '></div>
            <p>or</p>
            <div className='w-full h-[2px] bg-secondary-color dark:bg-primary-color-4 rounded-xl'></div>
        </div>

        <form onSubmit={signinEmail} className={` relative ${styles.flexBetween} flex-col gap-12 w-full text-primary-color-4 dark:text-secondary-color `}>
            
            <div className={`${styles.flexCenter} flex-col relative w-full gap-4`}>
                <label className={` relative ${stylescss.label} w-full font-semibold text-base `}>
                    <span className='relative top-[38px] left-4 transition-all duration-300 pointer-events-none '>Email</span>
                    <input required type="text" className='player_input' value={email} onChange={handleEmailChange} />
                    {emailError && (
                        <p className=' text-danger-color font-normal mt-2' >
                            Email address already is incorrect.
                        </p>
                    )}
                </label>
                <label className={` relative ${stylescss.label} w-full font-semibold text-base `}>
                    <span className='relative top-[38px] left-4 transition-all duration-300 pointer-events-none '>Password</span>
                    <input required type="password" className='player_input' value={password} onChange={handlePasswordChange} />
                    {passwordError && (
                        <>
                            <p className=' text-danger-color font-normal mt-2' >
                                Passowrd must be between 5 and 30 characters.
                            </p>
                            <p className=' text-danger-color font-normal mt-2' >
                                Passowrd must be contain atleast one uppercase and lowercase character.
                            </p>
                            <p className=' text-danger-color font-normal mt-2' >
                                Passowrd must be contain atleast one number.
                            </p>
                        </>
                    )}
                </label>
                <Link className='inline-block underline text-primary-color-77 dark:text-primary-color-53 hover:text-primary-color-53 dark:hover:text-primary-color-77 transition-all duration-300' href={'/signin/forgot-password'}>I forgot my password</Link>
            </div>



            <button onClick={signinEmail} className='cta-primary font-bold'>
            Sign in now
            </button>

        </form>

        <div className={` relative ${styles.flexCenter} flex-col w-full gap-4 text-center dark:text-primary-color-4 text-secondary-color `}>
            <p>
            Don't have an account? <Link href={'/signup'} className='inline-block underline text-primary-color-77 dark:text-primary-color-53 hover:text-primary-color-53 dark:hover:text-primary-color-77 transition-all duration-300'>sign up</Link>.
            </p>
        </div>
    </div>
    </section>
  );
};
