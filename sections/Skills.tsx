'use client';

import {useState, useRef} from 'react';
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

    const img_section = useRef<HTMLImageElement>(null);
    const label_section = useRef<HTMLDivElement>(null);
    const number_section = useRef<HTMLDivElement>(null);
    const [indexSkills, setIndexSkills] = useState(0);
    const numbers = Array.from({length: 3}, (_, i) => i + 1);

    function handleClick(number:number) {
        img_section.current!.animate({
            transform: 'translate(-100%, 0)',
            opacity: '0',
        }, {duration: 250, fill: 'forwards'} );

        label_section.current!.animate({
            transform: 'translate(-100%, 0)',
            opacity: '0',
        }, {duration: 250, fill: 'forwards'} );

        setTimeout(() => {
            img_section.current!.animate({
                transform: 'translate(100%, 0)',
            }, {duration: 0, fill: 'forwards'} );
            setIndexSkills(number);
        }, 750);

        setTimeout(() => {
            img_section.current!.animate({
                transform: 'translate(-0%, 0)',
                opacity: '1',
            }, {duration: 250, fill: 'forwards'} );
            label_section.current!.animate({
                transform: 'translate(-0%, 0)',
                opacity: '1',
            }, {duration: 250, fill: 'forwards'} );
        }, 1000);
        
        
        
    }

  return (
    <div id='skills' className={`${styles.flexCenter} lg:justify-between relative w-full lg:h-[700px] p-8 lg:px-0 flex-col gap-16 lg:flex-row-reverse overflow-hidden transition-all duration-300 `} >
        <div ref={label_section} className={` ${styles.flexCenter} flex-col lg:pl-12 h-64 lg:h-[700px] lg:w-96 lg:border-l border-secondary-color dark:border-primary-color-4`}>
            <h1 className={` ${styles.h1Section} text-primary-color-77 dark:text-primary-color-53 text-center md:text-right`}>{App_Skills[indexSkills].title}</h1>
            <p className={`  ${styles.Paragraph} text-center md:text-right `}>{App_Skills[indexSkills].desc}</p>
        </div>
        <div className={` ${styles.flexCenter} overflow-hidden `}>
            <Image
            ref={img_section}
            className=' relative transition-all duration-1000'
            src={App_Skills[indexSkills].illustration}
            alt={App_Skills[indexSkills].title}
            width={500}
            height={500}
            />
        </div>
        <div ref={number_section} className={` ${styles.flexBetween} w-screen lg:w-36 lg:h-full border-y border-y-secondary-color dark:border-y-primary-color-4 lg:flex-col`}>
            {numbers.map((number, index) => (
                <button onClick={() => {handleClick(index)}} className=' w-1/3 lg:w-full p-8 h-32 lg:h-1/3 text-6xl transition-all duration-300 border border-secondary-color dark:border-primary-color-4 hover:bg-primary-color-77 skills_btn' key={number}>
                    <p className={` ${indexSkills == index ? ' text-primary-color-53 dark:text-primary-color-77' : ' '} dark:text-primary-color-4 text-secondary-color`}>{`0${number}`}</p>
                </button>
            ))}
        </div>
        
    </div>
  )
}

export default Skills;