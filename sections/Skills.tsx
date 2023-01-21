'use client';

import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

// /componenets
import SolidSvg from '@/components/SolidSVG';

// constant
import { App_Skills } from '../constants';


const Skills = () => {

    const [indexSkills, setIndexSkills] = useState(0);
    const numbers = Array.from({length: 3}, (_, i) => i + 1);

  return (
    <div className={`${styles.flexCenter} lg:justify-between relative w-full lg:h-[60vh] p-8 lg:px-0 flex-col gap-16 lg:flex-row-reverse overflow-hidden `} >
        <div className={` ${styles.flexCenter} flex-col lg:pl-12 h-80 lg:h-full lg:w-96 lg:border-l border-secondary-color dark:border-primary-color-4`}>
            <h1 className={` ${styles.h1Section} text-primary-color-77 dark:text-primary-color-53 text-center md:text-right`}>{App_Skills[indexSkills].title}</h1>
            <p className={`  ${styles.h1Paragraph} text-center md:text-right `}>{App_Skills[indexSkills].desc}</p>
        </div>
        <div className={` ${styles.flexCenter} overflow-hidden `}>
            <Image
            className=''
            src={App_Skills[indexSkills].illustration}
            alt={App_Skills[indexSkills].title}
            width={500}
            height={500}
            />
        </div>
        <div className={` ${styles.flexBetween} w-screen lg:w-36 lg:h-full border-y border-y-secondary-color dark:border-y-primary-color-4 lg:flex-col`}>
            {numbers.map((number, index) => (
                <button onClick={() => {setIndexSkills(index);}} className=' w-1/3 lg:w-full p-8 h-32 lg:h-1/3 text-6xl transition-all duration-300 border border-secondary-color dark:border-primary-color-4 hover:bg-primary-color-77 skills_btn' key={number}>
                    <p className={` ${indexSkills == index ? ' text-primary-color-53 dark:text-primary-color-77' : ' '} text-primary-color-4 dark:text-secondary-color`}>{`0${number}`}</p>
                </button>
            ))}
        </div>
        
    </div>
  )
}

export default Skills;