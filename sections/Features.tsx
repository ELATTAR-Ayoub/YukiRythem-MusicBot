'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from "next-themes";

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

// components
import SolidSvg from '@/components/SolidSVG';

// constant
import { App_Features } from '../constants';

// motion
import { motion } from 'framer-motion';
import { fadeIn, slideIn, slideInRotating, staggerContainer, textVariant } from '../utils/motion';

interface HeroProps {
    mode?: 'light' | 'dark'
}

const Features: React.FC<HeroProps> = () => {

    const { theme } = useTheme();


  return (
    <motion.div id='learn_more'
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={` text-secondary-color bg-primary-color-4  dark:text-primary-color-4 dark:bg-secondary-color relative 2xl:max-w-[1440px] w-screen p-8 flex-col gap-16 lg:flex-row overflow-hidden `}>
        <div className={` ${styles.flexStart} w-full flex-col lg:flex-row gap-0 lg:gap-6`}>
            <motion.h1
            variants={textVariant(0.7)}
            className={` ${styles.h1Section} text-center md:text-left`}>Inspire, Relax & <span className='gradient1'>Boost your productivity</span></motion.h1>
            <motion.p 
            variants={textVariant(0.8)}
            className={`  ${styles.Paragraph} text-center md:text-left `}>{"Discover how YUKIRYTHEM's unique features can help you stay inspired, relaxed, and keep learning as you work."}</motion.p>
        </div>
        <div className={` ${styles.flexBetween} w-full flex-col lg:flex-row gap-6`}>
            {App_Features.map((feature, index) => (
                <motion.div 
                    variants={fadeIn('right', 'spring', (0.5 * (index + 1)), 2)}
                    key={`feature_${index}`} className={`relative ${styles.flexCenter} flex-col  rounded-3xl w-full h-[500px] p-6 bg_gradient1 gap-6 lg:gap-6`}>
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
                        src={ theme !== 'dark' ? feature.illustration : feature.illustration_dark}
                        alt={feature.illustration}
                        width={250}
                        height={150}
                        />
                    </div>
                    <h2 className=' font-bold text-xl md:text-2xl text-center z-10'>{feature.title}</h2>
                    <p className=' text-sm sm:text-base text-center z-10'>{feature.desc}</p>
                </motion.div>
            ))}
        </div>
    </motion.div>
  )
}

export default Features;
