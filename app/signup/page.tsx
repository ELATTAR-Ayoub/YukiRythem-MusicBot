'use client'

import React, { useState, useEffect } from 'react'

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from "next-themes";

// styles
import styles from '../../styles';
import stylescss from '../../styles/page.module.css';

export default function Page() {


  // inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordre, setPasswordre] = useState('');
  const [gender, setGender] = useState('');
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [shareData, setShareData] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordreError, setPasswordreError] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 20) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }

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

  const handlePasswordreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordre(event.target.value);
    if (event.target.value !== password) {
      setPasswordreError(true);
    } else {
      setPasswordreError(false);
    }
  }

  const signup = () => {

  }

  return (
    <div className={`${styles.flexCenter} flex-col text-secondary-color dark:text-primary-color-4 bg-primary-color-4 dark:bg-secondary-color relative w-full `}>
      <div className={`${styles.flexCenter} flex-col w-full sm:max-w-[675px]  p-8 gap-8 mb-6 `}>
        <div className={`${styles.flexStart} relative w-full flex-col`}>
          <h1 className={` ${styles.h1Section} text-center mb-0`}>Welcome to <span className='gradient1'>YukiRythem</span>  </h1>
          <p className={`  ${styles.Paragraph} text-center `}>Create your free account and start discovering new music and podcasts today!</p>
        </div>

        <div className={`${styles.flexStart} relative w-4/5 flex-col gap-4 text-base dark:text-secondary-color text-primary-color-4`}>
          <button className={`${styles.flexCenter} relative w-full gap-8  dark:bg-primary-color-4 bg-secondary-color font-semibold p-4 rounded-md hover:scale-105 transition-all duration-300 `}>
            <Image className="w-[24x] h-[24x] object-contain relative" src="/facebook_color.svg" alt="facebook_signup" width={24} height={24}/> 
            Sign up with facebook
          </button>
          <button className={`${styles.flexCenter} relative w-full gap-[50px] dark:bg-primary-color-4 bg-secondary-color font-semibold p-4 rounded-md hover:scale-105 transition-all duration-300 `}>
            <Image className="w-[24x] h-[24x] object-contain relative" src="/google_color.svg" alt="google_signup" width={24} height={24}/> 
            Sign up with google
          </button>
        </div>

        <div className={`${styles.flexCenter} relative w-full gap-2`}>
          <div className='w-full h-[2px] bg-secondary-color dark:bg-primary-color-4 rounded-xl '></div>
          <p>or</p>
          <div className='w-full h-[2px] bg-secondary-color dark:bg-primary-color-4 rounded-xl'></div>
        </div>

        <form onSubmit={signup} className={` relative ${styles.flexBetween} flex-col gap-12 w-full text-primary-color-4 dark:text-secondary-color `}>
            
            <div className={`${styles.flexCenter} flex-col relative w-full gap-4`}>
              <label className={` relative ${stylescss.label} w-full font-semibold text-base `}>
                  <span className='relative top-[38px] left-4 transition-all duration-300 pointer-events-none '>Display name: </span>
                  <input required type="text" className='player_input' value={name} onChange={handleNameChange} />
                  {nameError && (
                      <p className=' text-danger-color font-normal mt-2' >
                          Display name must be between 3 and 20 characters 
                      </p>
                  )}
              </label>
              <label className={` relative ${stylescss.label} w-full font-semibold text-base `}>
                  <span className='relative top-[38px] left-4 transition-all duration-300 pointer-events-none '>Email:</span>
                  <input required type="text" className='player_input' value={email} onChange={handleEmailChange} />
                  {emailError && (
                      <p className=' text-danger-color font-normal mt-2' >
                          Email address already in use or not valid.
                      </p>
                  )}
              </label>
              <label className={` relative ${stylescss.label} w-full font-semibold text-base `}>
                  <span className='relative top-[38px] left-4 transition-all duration-300 pointer-events-none '>Password:</span>
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
              <label className={` relative ${stylescss.label} w-full font-semibold text-base `}>
                  <span className='relative top-[38px] left-4 transition-all duration-300 pointer-events-none '>Confirm Password:</span>
                  <input required type="password" className='player_input' value={passwordre} onChange={handlePasswordreChange} />
                  {passwordreError && (
                      <p className=' text-danger-color font-normal mt-2' >
                          Passwords does not match
                      </p>
                  )}
              </label>
            </div>


            <label className={` relative ${stylescss.label} w-full font-semibold text-base dark:text-primary-color-4 text-secondary-color`}>
                <p className='relative  my-4'>What&apos;s your gender?</p>
                <div className={` relative ${styles.flexStart} w-full `}>
                    <label className={` ${styles.flexCenter} relative font-normal gap-4 mr-12`}>
                        <input required type="radio" name="gender" value="male" className='w-4 h-4 rounded-full' onChange={e => setGender(e.target.value)} />
                        Male
                    </label>
                    <label className={` ${styles.flexCenter} relative font-normal gap-4 mr-12`}>
                        <input required type="radio" name="gender" value="female" className=' w-4 h-4 rounded-full' onChange={e => setGender(e.target.value)} />
                        Female
                    </label>
                    <label className={` ${styles.flexCenter} relative font-normal whitespace-nowrap gap-4 mr-12`}>
                        <input required type="radio" name="gender" value="other" className='w-4 h-4 rounded-full' onChange={e => setGender(e.target.value)} />
                        Non-binary
                    </label>
                </div>
            </label>

            <div className={` relative ${styles.flexStart} flex-col w-full gap-4  dark:text-primary-color-4 text-secondary-color `}>
              <label className={` ${styles.flexCenter} relative font-normal gap-4`}>
                <input type="checkbox" className='w-4 h-4' value={'true'} onChange={e => setMarketingEmails(Boolean(e.target.value))} />
                I would prefer not to receive marketing messages from YukiRythem.
              </label>
              <label className={` ${styles.flexCenter} relative font-normal gap-4`}>
                <input type="checkbox" className='w-4 h-4' value={'true'} onChange={e => setShareData(Boolean(e.target.value))} />
                Share my registration data with YukiRythem&apas;s content providers for marketing purposes.
              </label>
            </div>


            <div className={` relative ${styles.flexStart} flex-col w-3/4 gap-4 text-center text-xs dark:text-primary-color-4 text-secondary-color `}>
              <p>
                By clicking on sign-up, you agree to  YukiRythem's <Link href={'/legal/end-user-agreement/'} className='inline-block underline text-primary-color-77 hover:text-primary-color-53 transition-all duration-300'>Terms and Conditions of Use</Link>.
              </p>
              <p>
                To learn more about how  YukiRythem collects, uses, shares and protects your personal data, please see <Link href={'/legal/privacy-policy/'} className='inline-block underline text-primary-color-77 hover:text-primary-color-53 transition-all duration-300'> YukiRythem's Privacy Policy</Link>.
              </p>
            </div>

            <button onClick={() => {signup}} className='cta-primary font-bold'>
              Sign up now
            </button>

        </form>

        <div className={` relative ${styles.flexCenter} flex-col w-full gap-4 text-center dark:text-primary-color-4 text-secondary-color `}>
          <p>
            Already have an account? <Link href={'/signin'} className='inline-block underline text-primary-color-77 hover:text-primary-color-53 transition-all duration-300'>sign in</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};
