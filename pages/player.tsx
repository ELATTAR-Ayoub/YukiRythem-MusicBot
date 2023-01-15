'use client';

import React, { useState } from 'react'
import Image from 'next/image'

// components
import WaveSurferComp from '../components/waveSurfer'

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';


export default function Home() {

    const audioURL = 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3'

    const [inputValue, setInputValue] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const searchMusic = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        console.log(`Hello ${inputValue}`)
        setInputValue('')
    }


  return (
    <div className={` ${styles.flexCenter} flex-col relative h-screen overflow-hidden bg-primary-color-83 `} >
        <div id='player' className={` ${styles.flexCenter} flex-col gap-[30px] relative w-[400px] h-[850] bg-primary-color-4 `}>
            <div className={`grid grid-cols-[25%_50%_25%] relative w-full p-8`}>
                <div className='grid content-center'>
                    <button aria-label="open_music_list">
                        <Image className="w-[24px] h-[24px] object-contain relative" src="/list.svg" alt="open_music_list" width={24} height={24}/>
                    </button>
                </div>
                <div className=' bg-primary-color-53 grid content-center text-center py-1 px-8 text-primary-color-83 rounded font-bold'>
                    Now Playing
                </div>
                <div className={`flex items-center justify-end gap-6`}>
                    <button className='grid content-center' aria-label="share_this_song">
                        <Image className="w-[24px] h-[24px] object-contain relative" src="/share.svg" alt="share_this_song" width={24} height={24}/>
                    </button>
                    <button className='grid content-center' aria-label="download_this_song">
                        <Image className="w-[24px] h-[24px] object-contain relative" src="/download.svg" alt="download_this_song" width={24} height={24}/>
                    </button>
                </div>
            </div>
            <div className={` ${styles.flexStart} gap-[150px] h-64 w-full px-8 overflow-hidden `}>
                <div className='relative flex '>
                    <div className={` ${stylescss.darkOverlay} w-[200px] h-[250px] rounded-lg overflow-hidden z-[2] `}>
                        <img className=" h-full object-cover relative" src="https://images.unsplash.com/photo-1673620068429-7546b29532cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="music_thumbnails" />
                    </div>
                    <div className={` ${stylescss.darkOverlay} ${stylescss.blackHoleDisk} absolute w-[200px] h-[200px] rounded-full overflow-hidden top-1/2 left-28 -translate-y-1/2 z-[1] `}>
                        <img className=" h-full object-cover relative" src="https://images.unsplash.com/photo-1673620068429-7546b29532cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="music_thumbnails" />
                    </div>
                </div>
                {/* delete those and use a loop plz! */}
                <div className='relative flex '>
                    <div className={` ${stylescss.darkOverlay} w-[200px] h-[250px] rounded-lg overflow-hidden z-[2] `}>
                        <img className=" h-full object-cover relative" src="https://images.unsplash.com/photo-1673620068429-7546b29532cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="music_thumbnails" />
                    </div>
                    <div className={` ${stylescss.darkOverlay} ${stylescss.blackHoleDisk} absolute w-[200px] h-[200px] rounded-full overflow-hidden top-1/2 left-28 -translate-y-1/2 z-[1] `}>
                        <img className=" h-full object-cover relative" src="https://images.unsplash.com/photo-1673620068429-7546b29532cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="music_thumbnails" />
                    </div>
                </div>
            </div>
            <div className={` grid grid-cols-[24px_2fr_24px] gap-10 relative w-full text-primary-color-83 p-8`}>
                <div className='grid content-center'>
                    <button aria-label="Add_to_my_favorite_list">
                        <Image className="w-[24px] h-[24px] object-contain relative" src="/heart.svg" alt="Add_to_my_favorite_list" width={24} height={24}/>
                    </button>
                </div>

                <div className={` ${styles.flexBetween} text-center flex-col relative`}>
                    <div id='music-title' className={` ${stylescss.elleipsAfterSecondLine} text-2xl font-bold mb-2`}>Re:AIM Aimer Gundam OP we should not show all this crap here</div>
                    <div id='music-owner' className=' text-base'>aimer</div>
                </div>

                <div  className='grid content-center'>
                    <button aria-label="Add_to_my_list">
                        <Image className="w-[24px] h-[24px] object-contain relative" src="/plus.svg" alt="Add_to_my_list" width={24} height={24}/>
                    </button>
                </div>
            </div>

            <div className={` ${styles.flexBetween} flex-col bg-secondary-color w-full p-8 h-[333px] rounded-t-[35px]`}>
                <div className='w-full h-[33.33%]'>
                    <div className='w-full h-[90%] bg-red-300'>
                        {/* <WaveSurferComp/> */}
                        <audio controls src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"></audio>
                    </div>
                    <div className={` ${styles.flexBetween} w-full `}>
                        <p>00:01</p>
                        <p>03:23</p>
                    </div>
                </div>
                <div className={` grid grid-cols-[24px_1fr_24px] gap-[30px] content-center relative w-full text-primary-color-83`}>
                    <div className='grid content-center'>
                        <button aria-label="shuffle_button">
                            <Image className="w-[24px] h-[24px] object-contain relative" src="/shuffle.svg" alt="shuffle_button" width={24} height={24} />
                        </button>
                    </div>
                    <div className={` ${styles.flexBetween} relative gap-[25px]`}>
                        <button aria-label="skip_to_previous_song" className=' scale-[-1]'>
                            <Image className="w-[46px] h-[46px] object-contain relative" src="/next_song.svg" alt="skip_to_previous_song" width={46} height={46}/>
                        </button>
                        <button aria-label="play_song_button" className={` ${styles.flexCenter} w-[75px] h-[75px] rounded-full bg-primary-color-53 `}>
                            <Image className="w-[46px] h-[46px] object-contain relative" src="/play.svg" alt="play_song_button" width={46} height={46}/>
                        </button>
                        <button aria-label="skip_to_next_song">
                            <Image className="w-[46px] h-[46px] object-contain relative" src="/next_song.svg" alt="skip_to_next_song" width={46} height={46}/>
                        </button>
                    </div>
                    <div className='grid content-center'>
                        <button aria-label="loop_song">
                            <Image className="w-[24px] h-[24px] object-contain relative" src="/loop.svg" alt="loop_button" width={24} height={24}/>
                        </button>
                    </div>
                </div>
                <div className='w-full'>
                    <form className={` relative ${styles.flexBetween} flex-col w-full text-primary-color-4 `}>
                        <label className={` relative ${stylescss.label} w-full font-bold text-base `}>
                            <span className='relative top-[38px] left-4 transition-all'>Music name/URL:</span>
                            <input required className='transition-all rounded-md overflow-hidden w-full p-3 border-primary-color-77 border-2 focus:outline-primary-color-53 focus:outline-2' type="text" value={inputValue} onChange={handleChange} />
                        </label>
                        
                        <button aria-label="search_music" type="button" onClick={searchMusic} className='absolute right-2 top-[30px] rounded-full bg-primary-color-77 hover:bg-primary-color-53 transition-all flex justify-center items-center overflow-hidden w-10 h-10' >
                            <Image className="object-contain relative" src="/search.svg" alt="search_music" width={24} height={24}/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
    </div>
  )
}
