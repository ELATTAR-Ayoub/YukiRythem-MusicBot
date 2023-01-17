'use client';

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

// components
import WaveSurferComp from '../components/waveSurfer'
import NativeVideo from '../components/NativeVideo';
import Loader from '@/components/loader';
import SolidSvg from '@/components/SolidSVG';

// styles
import styles from '../styles/index';
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

    // var
    const [moveLeftPX, setMoveLeftPX] = useState(-355);

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

    const [inputValue, setInputValue] = useState('');

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

    // check window with and update the scrolling animation:
    useEffect(() => {
        if (typeof window !== 'undefined') {
          if (window.innerWidth > 1024) {
            setMoveLeftPX(-610);
          } else {
            setMoveLeftPX(-355);
          }
        }
      }, [current]);

    // styles
    const MoveLeftStyle = {
        left: `${moveLeftPX * current}px`
    };


  return (
    <div className={` ${styles.flexCenter} flex-col relative overflow-hidden w-full h-[90%]`} >
        <div id='player' className={` ${styles.flexBetween} lg:justify-end flex-col gap-[20px] relative bg-primary-color-4 dark:bg-secondary-color overflow-hidden  h-full w-full `}>
            <div className={`grid lg:hidden grid-cols-[25%_50%_25%] relative p-8 md:px-0 sm:max-w-[675px] lg:max-w-[800px] w-full`}>
                <div className='grid content-center'>
                    <button aria-label="open_music_list">
                        <SolidSvg width={'24px'} height={'24px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/list.svg'} />
                    </button>
                </div>
                <div className=' bg-primary-color-53 grid content-center text-center py-1 px-8 text-primary-color-83 dark:text-secondary-color rounded font-semibold'>
                    {(musicLoading && musicPlaying) ? 'Now Playing' : 'Sleeping'}
                </div>
                <div className={`flex items-center justify-end gap-6`}>
                    <button className='grid content-center' aria-label="share_this_song">
                        <SolidSvg width={'24px'} height={'24px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/share.svg'} />
                    </button>
                    <button className='grid content-center' aria-label="download_this_song">
                        <SolidSvg width={'24px'} height={'24px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/download.svg'} />
                    </button>
                </div>
            </div>

            <div className={` relative  px-8 md:px-0 h-64 min-h-64 max-h-64 lg:h-96 lg:min-h-96 lg:max-h-96 w-full sm:max-w-[675px] lg:max-w-[800px] xl:max-w-[1014px]`}>
                {(!musicLoading) ? <div className='w-scren'><Loader /></div> : <></>} 
                <div style={MoveLeftStyle} className={` relative ${styles.flexStart} transition-all duration-300 gap-40 lg:gap-52 w-full h-full`}>
                    {musicState.map(musicStateSimble => (
                        <div key={musicStateSimble.ID} className={`${musicStateSimble.ID != musicState[current].ID ? 'opacity-70 scale-75' : ''} relative flex `}>
                            <div className={` ${stylescss.darkOverlay} w-[200px] h-[250px] lg:w-[400px] lg:h-[370px] rounded-lg overflow-hidden z-[2] `}>
                                <img className=" h-full object-cover relative" src={(musicState[current]) ? musicStateSimble.thumbnails[0] : ''} alt="music_thumbnails" />
                            </div>
                            <div className={` ${stylescss.darkOverlay} ${stylescss.blackHoleDisk} absolute w-[200px] h-[200px] lg:w-[330px] lg:h-[330px] left-28 lg:left-60 rounded-full overflow-hidden top-1/2 -translate-y-1/2 z-[1] `}>
                                <img className=" h-full object-cover relative" src={(musicState[current]) ? musicStateSimble.thumbnails[0] : ''} alt="music_thumbnails" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={` grid grid-cols-[24px_2fr_24px] sm:grid-cols-[2fr_24px_24px] lg:grid-cols-[2fr_24px_24px_24px_24px_24px] gap-10 relative  text-primary-color-83 dark:text-primary-color-4 p-8 md:px-0 sm:max-w-[675px] lg:max-w-[800px] xl:max-w-[1014px] w-full`}>
                <div className='grid content-center'>
                    <button aria-label="Add_to_my_favorite_list">
                        <SolidSvg width={'24px'} height={'24px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/heart_empty.svg'} />
                    </button>
                </div>

                <div className={` ${styles.flexBetween}  flex-col relative overflow-hidden text-center sm:text-left sm:order-first`}>
                    <div title={(musicState[current]) ? musicState[current].title : "Search for music by inserting the name or the URL in the input below, let's jam!"} className={` ${stylescss.elleipsAfterSecondLine} text-[100%] lg:text- font-bold mb-2 w-full`}>{(musicState[current]) ? musicState[current].title : "Search for music by inserting the name or the URL in the input below, let's jam!"}</div>
                    <div title={(musicState[current]) ? musicState[current].owner.name : ''} className={`${stylescss.elleipsAfterFirstLine} text-sm w-full`}>{(musicState[current]) ? musicState[current].owner.name : 'ELATTAR Ayub'} {current}</div>
                </div>

                <div  className='grid content-center'>
                    <button aria-label="Add_to_my_list">
                        <SolidSvg width={'24px'} height={'24px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/plus.svg'} />
                    </button>
                </div>

                <div className='hidden lg:grid content-center'>
                    <button aria-label="open_music_list">
                        <SolidSvg width={'24px'} height={'24px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/list.svg'} />
                    </button>
                </div>

                <div  className='hidden lg:grid content-center'>
                    <button className='grid content-center' aria-label="share_this_song">
                        <SolidSvg width={'24px'} height={'24px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/share.svg'} />
                    </button>
                </div>

                <div  className='hidden lg:grid content-center'>
                    <button className='grid content-center' aria-label="download_this_song">
                        <SolidSvg width={'24px'} height={'24px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/download.svg'} />
                    </button>
                </div>
                
            </div>

            <div className={` ${styles.flexBetween} flex-col bg-secondary-color dark:bg-primary-color-4 p-8  rounded-t-[35px] w-full h-[333px]`}>
                <div className=' w-full sm:max-w-[675px] lg:max-w-[800px] xl:max-w-[1014px]'>
                    {/* {<WaveSurferComp />} */}
                    {<NativeVideo videoId={(musicState[current]) ? musicState[current].ID : ''} />}
                </div>
                <div className='w-full sm:max-w-[675px] lg:max-w-[800px] xl:max-w-[1014px]'>
                    <form onSubmit={searchMusic} className={` relative ${styles.flexBetween} flex-col w-full text-primary-color-4 dark:text-secondary-color `}>
                        <label className={` relative ${stylescss.label} w-full font-semibold text-base `}>
                            <span className='relative top-[38px] left-4 transition-all duration-300'>Music name/URL:</span>
                            <input required type="text" value={inputValue} onChange={handleChange} className='transition-all rounded-md overflow-hidden w-full p-3 border-primary-color-77 border-2 focus:outline-primary-color-53 focus:outline-2 dark:bg-primary-color-4'  />
                        </label>
                        
                        <button aria-label="search_music" type="button" onClick={searchMusic} className='absolute right-2 top-[30px] rounded-full bg-primary-color-77 dark:bg-primary-color-53 hover:bg-primary-color-53 dark:hover:bg-primary-color-77 transition-all flex justify-center items-center overflow-hidden w-10 h-10' >
                            <SolidSvg width={'24px'} height={'24px'} className={'SVGB2W'} path={'/search.svg'} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
    </div>
  )
}
