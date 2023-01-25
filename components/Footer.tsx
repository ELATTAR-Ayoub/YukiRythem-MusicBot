import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

// styles
import styles from '../styles/index';
import stylescss from '../styles/page.module.css';

// components
import LightModeBtn from './LightModeBtn.jsx';
import Logo from './Logo';
import SolidSvg from './SolidSVG';

// constants
import {Footer_links} from '../constants/index'

// motion
import { motion } from 'framer-motion';
import { fadeIn, slideIn, staggerContainer, textVariant } from '../utils/motion';


const Header = () => {
  const router = useRouter();

  return (
    <section className={` ${styles.flexCenter} flex-col w-screen bg-[#121212]`}>
        <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }} 
        className={` ${styles.flexStart} p-8 flex-col gap-16 2xl:max-w-[1440px] w-full lg:flex-row `}>

            <motion.div 
            variants={fadeIn('right', 'spring', 0, 0.8)}
            className={` w-full lg:w-1/4 my-6`}>
                <Link href="/">

                <svg className='w-[100px] h-[30px] object-contain relative' width="77" height="15" viewBox="0 0 77 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className=' dark:fill-primary-color-53' d="M2.84 8.04L0.18 -9.53674e-07H2.52L4.02 5.14H4.06L5.56 -9.53674e-07H7.7L5.04 8.04V14H2.84V8.04ZM11.8911 14.2C10.8244 14.2 10.0111 13.9 9.45109 13.3C8.89109 12.6867 8.61109 11.8133 8.61109 10.68V-9.53674e-07H10.8111V10.84C10.8111 11.32 10.9044 11.6667 11.0911 11.88C11.2911 12.0933 11.5711 12.2 11.9311 12.2C12.2911 12.2 12.5644 12.0933 12.7511 11.88C12.9511 11.6667 13.0511 11.32 13.0511 10.84V-9.53674e-07H15.1711V10.68C15.1711 11.8133 14.8911 12.6867 14.3311 13.3C13.7711 13.9 12.9578 14.2 11.8911 14.2ZM16.738 -9.53674e-07H18.938V5.9L21.738 -9.53674e-07H23.938L21.318 5.14L23.978 14H21.678L19.818 7.76L18.938 9.54V14H16.738V-9.53674e-07ZM25.0192 -9.53674e-07H27.2192V14H25.0192V-9.53674e-07Z" fill="#A1C6EA"/>
                    <path d="M28.8669 -9.53674e-07H32.1269C33.2602 -9.53674e-07 34.0869 0.266666 34.6069 0.799999C35.1269 1.32 35.3869 2.12667 35.3869 3.22V4.08C35.3869 5.53333 34.9069 6.45333 33.9469 6.84V6.88C34.4802 7.04 34.8535 7.36667 35.0669 7.86C35.2935 8.35333 35.4069 9.01333 35.4069 9.84V12.3C35.4069 12.7 35.4202 13.0267 35.4469 13.28C35.4735 13.52 35.5402 13.76 35.6469 14H33.4069C33.3269 13.7733 33.2735 13.56 33.2469 13.36C33.2202 13.16 33.2069 12.8 33.2069 12.28V9.72C33.2069 9.08 33.1002 8.63333 32.8869 8.38C32.6869 8.12667 32.3335 8 31.8269 8H31.0669V14H28.8669V-9.53674e-07ZM31.8669 6C32.3069 6 32.6335 5.88667 32.8469 5.66C33.0735 5.43333 33.1869 5.05333 33.1869 4.52V3.44C33.1869 2.93333 33.0935 2.56667 32.9069 2.34C32.7335 2.11333 32.4535 2 32.0669 2H31.0669V6H31.8669ZM38.6408 8.04L35.9808 -9.53674e-07H38.3208L39.8208 5.14H39.8608L41.3608 -9.53674e-07H43.5008L40.8408 8.04V14H38.6408V8.04ZM46.29 2H43.99V-9.53674e-07H50.79V2H48.49V14H46.29V2ZM51.8552 -9.53674e-07H54.0552V5.7H56.4152V-9.53674e-07H58.6152V14H56.4152V7.7H54.0552V14H51.8552V-9.53674e-07ZM60.2536 -9.53674e-07H66.2536V2H62.4536V5.7H65.4736V7.7H62.4536V12H66.2536V14H60.2536V-9.53674e-07ZM67.5192 -9.53674e-07H70.6592L72.0592 10.02H72.0992L73.4992 -9.53674e-07H76.6392V14H74.5592V3.4H74.5192L72.9192 14H71.0792L69.4792 3.4H69.4392V14H67.5192V-9.53674e-07Z" fill="#DAE3E5"/>
                </svg>
                    
                </Link>
            </motion.div>

            <div className={`${styles.flexStart} flex-col lg:flex-row w-full gap-16`}>
                {Footer_links.map((footer_link, index) => (
                <motion.div
                variants={fadeIn('right', 'spring', (0.5 * (index + 1)), 1)}
                key={`${Footer_links}_${index}`} className={`${styles.flexStart} flex-col`}>
                    <h3 className=' text-lg font-bold text-primary-color-77 my-6'>{footer_link.title}</h3>
                    {footer_link.links.map(({ label, path }) => (
                        <Link className=' text-sm text-secondary-color my-3 transition-all duration-300 hover:underline' key={label} href={path}>
                            {label}
                        </Link>
                    ))}
                </motion.div>
                ))}
            </div>

            <motion.div 
            variants={fadeIn('right', 'spring', 0, 0.8)}
            className={` w-full lg:w-full`}>
                <p className='text-base text-secondary-color my-6'>Thank you for choosing YUKIRYTHEM! We hope you enjoy using our app to enhance your productivity, stay inspired, and discover new music and podcasts. We&apos;re constantly working to improve the app and add new features, so please don&apos;t hesitate to reach out to us with any feedback or suggestions.</p>
                <p className='text-base text-secondary-color my-3 mb-12'>Developed with &lt;3 by ELATTAR Ayoub.</p>
                <p className=' opacity-70 text-base text-secondary-color text-center'>Copyright &#169; 2023 YUKIRYTHEM</p>
            </motion.div>
        </motion.div>
        
    </section>
  );
};

export default Header;