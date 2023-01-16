'use client';

import React, { useState } from 'react'
import Image from 'next/image'

// components
import WaveSurferComp from '../components/waveSurfer'
import NativeVideo from '../components/NativeVideo';
import Loader from '@/components/loader';

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

// redux
import { selectMusicState, selectCurrentMusic, selectMusicPlaying, selectMusicLoading, ADD_ITEM } from "../store/musicSlice";
import { useDispatch, useSelector } from "react-redux";


// 
export default function Home() {
    // call redux states
    const musicState = useSelector(selectMusicState);
    const current = useSelector(selectCurrentMusic);
    const musicPlaying = useSelector(selectMusicPlaying);
    const musicLoading = useSelector(selectMusicLoading);
    const dispatch = useDispatch();

    console.log('musicState =>>>');
    console.log(musicState);
    

    interface owner {
        name: string;
        ID: string;
        canonicalURL: string;
        thumbnails?: string[];
    }
    
    interface Data {
        ID: string;
        URL: string;
        title: string;
        thumbnails: string[];
        owner: owner;
        musicLengthSec?: number;
        message?: string;
    }

    const [inputValue, setInputValue] = useState('tokyo ghoul sky');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const searchMusic = (event: React.MouseEvent<HTMLButtonElement>  | React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // 
        fetch("/api/searchEngine", {
            method: "POST",
            body: JSON.stringify({string: inputValue}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then((data:Data) => {
            console.log('data =>>>>>');
            console.log(data);
            console.log(data.URL);
            dispatch(ADD_ITEM(data));
            console.log(musicState);
        })
        .catch(error => {
            console.log(error);
        });
        // 
        setInputValue('');
        
    }

    // styles
    const MoveLeft = {
        left: `${-355 * current}px`
    };


  return (
    <div className={` ${styles.flexCenter} flex-col relative overflow-hidden h-screen bg-primary-color-83 `} >
        <div id='player' className={` ${styles.flexBetween} lg:justify-end flex-col gap-[20px] relative bg-primary-color-4 overflow-hidden  h-full w-full `}>
            <div className={`grid lg:hidden grid-cols-[25%_50%_25%] relative p-8 md:px-0 sm:max-w-[675px] lg:max-w-[800px] w-full`}>
                <div className='grid content-center'>
                    <button aria-label="open_music_list">
                        <Image className="w-[24px] h-[24px] object-contain relative" src="/list.svg" alt="open_music_list" width={24} height={24}/>
                    </button>
                </div>
                <div className=' bg-primary-color-53 grid content-center text-center py-1 px-8 text-primary-color-83 rounded font-bold'>
                    {(musicLoading && musicPlaying) ? 'Now Playing' : 'Sleeping'}
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

            <div style={MoveLeft} className={` relative ${styles.flexStart} gap-[150px] h-64 min-h-64 max-h-64 w-full px-8 transition-all`}>
                {(!musicLoading) ? <Loader /> : <></>}   
                {musicState.map(musicStateSimble => (
                    <div key={musicStateSimble.ID} className='relative flex '>
                        <div className={` ${stylescss.darkOverlay} w-[200px] h-[250px] rounded-lg overflow-hidden z-[2] `}>
                            <img className=" h-full object-cover relative" src={(musicState[current]) ? musicStateSimble.thumbnails[0] : ''} alt="music_thumbnails" />
                        </div>
                        <div className={` ${stylescss.darkOverlay} ${stylescss.blackHoleDisk} absolute w-[200px] h-[200px] rounded-full overflow-hidden top-1/2 left-28 -translate-y-1/2 z-[1] `}>
                            <img className=" h-full object-cover relative" src={(musicState[current]) ? musicStateSimble.thumbnails[0] : ''} alt="music_thumbnails" />
                        </div>
                    </div>
                ))}
            </div>

            <div className={` grid grid-cols-[24px_2fr_24px] sm:grid-cols-[2fr_24px_24px] lg:grid-cols-[2fr_24px_24px_24px_24px_24px] gap-10 relative  text-primary-color-83 p-8 md:px-0 sm:max-w-[675px] lg:max-w-[800px] xl:max-w-[1014px] w-full`}>
                <div className='grid content-center'>
                    <button aria-label="Add_to_my_favorite_list">
                        <Image className="w-[24px] h-[24px] object-contain relative" src="/heart.svg" alt="Add_to_my_favorite_list" width={24} height={24}/>
                    </button>
                </div>

                <div className={` ${styles.flexBetween}  flex-col relative overflow-hidden text-center sm:text-left sm:order-first`}>
                    <div id='music-title' title={(musicState[current]) ? musicState[current].title : "Search for music by inserting the URL or name in the input below, let's jam!"} className={` ${stylescss.elleipsAfterSecondLine} text-[100%] font-bold mb-2 w-full`}>{(musicState[current]) ? musicState[current].title : "Search for music by inserting the URL or name in the input below, let's jam!"}</div>
                    <div id='music-owner' title={(musicState[current]) ? musicState[current].owner.name : ''} className={`${stylescss.elleipsAfterFirstLine} text-sm w-full`}>{(musicState[current]) ? musicState[current].owner.name : 'ELATTAR Ayub'} {current}</div>
                </div>

                <div  className='grid content-center'>
                    <button aria-label="Add_to_my_list">
                        <Image className="w-[24px] h-[24px] object-contain relative" src="/plus.svg" alt="Add_to_my_list" width={24} height={24}/>
                    </button>
                </div>

                <div className='hidden lg:grid content-center'>
                    <button aria-label="open_music_list">
                        <Image className="w-[24px] h-[24px] object-contain relative" src="/list.svg" alt="open_music_list" width={24} height={24}/>
                    </button>
                </div>

                <div  className='hidden lg:grid content-center'>
                    <button className='grid content-center' aria-label="share_this_song">
                        <Image className="w-[24px] h-[24px] object-contain relative" src="/share.svg" alt="share_this_song" width={24} height={24}/>
                    </button>
                </div>

                <div  className='hidden lg:grid content-center'>
                    <button className='grid content-center' aria-label="download_this_song">
                        <Image className="w-[24px] h-[24px] object-contain relative" src="/download.svg" alt="download_this_song" width={24} height={24}/>
                    </button>
                </div>
                
            </div>

            <div className={` ${styles.flexBetween} flex-col bg-secondary-color p-8  rounded-t-[35px] w-full h-[333px]`}>
                <div className=' w-full sm:max-w-[675px] lg:max-w-[800px] xl:max-w-[1014px]'>
                    {/* {<WaveSurferComp />} */}
                    {<NativeVideo videoId={(musicState[current]) ? musicState[current].ID : ''} />}
                </div>
                <div className='w-full sm:max-w-[675px] lg:max-w-[800px] xl:max-w-[1014px]'>
                    <form onSubmit={searchMusic} className={` relative ${styles.flexBetween} flex-col w-full text-primary-color-4 `}>
                        <label className={` relative ${stylescss.label} w-full font-bold text-base `}>
                            <span className='relative top-[38px] left-4 transition-all'>Music name/URL: {current}</span>
                            <input required type="text" value={inputValue} onChange={handleChange} className='transition-all rounded-md overflow-hidden w-full p-3 border-primary-color-77 border-2 focus:outline-primary-color-53 focus:outline-2'  />
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
