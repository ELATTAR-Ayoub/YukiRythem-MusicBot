'use client';

import Image from 'next/image';
import Link from 'next/link';

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

// components
import SolidSvg from '@/components/SolidSVG';

// constant
import { App_Features } from '../constants';

export default function Features() {
  return (
    <div id='learn_more' className={` ${styles.flexBetween} w-full p-8 flex-col text-secondary-color gap-16 bg-primary-color-4`}>
        <div className={` ${styles.flexStart} w-full flex-col lg:flex-row gap-0 lg:gap-6`}>
            <h1 className='text-5xl w-full font-bold leading-[65px] my-6 mt-0'>Inspire, Relax & <span className='gradient1'>Boost your productivity</span></h1>
            <p className='text-lg w-full my-6'>{"Discover how YUKIRYTHEM's unique features can help you stay inspired, relaxed, and keep learning as you work."}</p>
        </div>
        <div className={` ${styles.flexBetween} w-full flex-col lg:flex-row gap-6`}>
            {App_Features.map((feature, index) => (
                <div key={`feature_${index}`} className={`relative ${styles.flexCenter} flex-col  rounded-3xl w-full h-[500px] p-6 text-secondary-color bg_gradient1 gap-6 lg:gap-6`}>
                    <div>
                            <Image
                            className='absolute -bottom-5 left-0 -translate-x-1/2  rotateInfinite3 z-0 opacity-25'
                            src={feature.semi_illustration[0]}
                            alt={feature.semi_illustration[0]}
                            width={42}
                            height={42}
                            />
                            <Image
                            className='absolute top-0 -right-10 -translate-x-1/2 rotateInfinite2 z-0 opacity-25'
                            src={feature.semi_illustration[1]}
                            alt={feature.semi_illustration[1]}
                            width={52}
                            height={52}
                            />
                            <Image
                            className='absolute top-10 left-2 -translate-x-1/2 rotateInfinite1 z-0 opacity-25'
                            src={feature.semi_illustration[2]}
                            alt={feature.semi_illustration[2]}
                            width={32}
                            height={32}
                            />
                        </div>
                    
                    <div className={` ${styles.flexCenter} relative `}>
                        
                        <Image
                        className='h-[150px] mb-4'
                        src={feature.illustration}
                        alt={feature.illustration}
                        width={250}
                        height={150}
                        />
                    </div>
                    <h2 className=' font-bold text-2xl text-center z-10'>{feature.title}</h2>
                    <p className=' text-base text-center z-10'>{feature.desc}</p>
                </div>
            ))}
        </div>
    </div>
  )
}