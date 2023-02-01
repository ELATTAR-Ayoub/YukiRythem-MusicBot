'use client';

import React, { useState, useEffect } from 'react'
import Link from 'next/link';

// components
import NativeVideo from '@/components/NativeVideo';
import Loader from '@/components/loader';
import SolidSvg from '@/components/SolidSVG';
import MusicList from '@/components/MusicList';

// styles
import styles from '@/styles/index';
import stylescss from '@/styles/page.module.css';

// redux
import { selectMusicState, selectCurrentMusic, selectMusicPlaying, selectMusicLoading, selectMusicVolume, ADD_ITEM, SET_VOLUME } from "@/store/musicSlice";
import { useDispatch, useSelector } from "react-redux";

// auth
import { useAuth } from '@/context/AuthContext'

// 
export default function Page() {
    const { user, likeMusic, dislikeMusic } = useAuth();
    // call redux states
    const musicState = useSelector(selectMusicState);
    const current = useSelector(selectCurrentMusic);
    const volume = useSelector(selectMusicVolume);
    const musicPlaying = useSelector(selectMusicPlaying);
    const musicLoading = useSelector(selectMusicLoading);
    const dispatch = useDispatch();

    // var
    const [moveLeftPX, setMoveLeftPX] = useState(-355);

    // console.log('musicState =>>>');
    // console.log(musicState);
    

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

    const openMusicList = () => {
        const element = document.getElementById("music_list_popup");
        if (element) {
        element.style.height = '60vh';
        element.style.overflow = 'visible';
        }
        console.log(user);
        
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


    const handleLikeMusic = async (music: Data) => {
        if (!musicState[current].ID) {
          return;  
        }

        const Music_small = {
            ID: music.ID,
            title: music.title,
            thumbnails: [music.thumbnails[0]],
        }

        if ( user.lovedSongs.some((lovedSong:any) => lovedSong.ID === musicState[current].ID) ) {
            await dislikeMusic(Music_small);
            return;
        }
        
        await likeMusic(Music_small);
    };

    function nextoggleVolumeSeekBartStep() {
        const volume_seekBar = document.getElementById('volume_seekBar_container');
        console.log('yo');
        

        if (volume_seekBar) {
            console.log('yo yo');
            console.log(volume_seekBar.style.display);
            console.log(volume_seekBar.style);
            
            if (volume_seekBar.style.display == 'flex') {
                volume_seekBar.style.display = 'hidden';
                console.log('yo yo hidden');
                return
            }

            if (volume_seekBar.style.display == 'hidden') {
                volume_seekBar.style.display = 'flex';
                console.log('yo yo flex');
                return
            }
        }

    }


  return (
    <section className={` ${styles.flexCenter} flex-col relative overflow-hidden w-full h-[90vh]`} >
        <div id='player' className={` ${styles.flexBetween} lg:justify-end flex-col gap-[20px] relative bg-primary-color-4 dark:bg-secondary-color overflow-hidden  h-full w-full `}>
            <div className={`grid lg:hidden grid-cols-[25%_50%_25%] relative p-8 md:px-0 sm:max-w-[675px] lg:max-w-[800px] w-full`}>
                <div className='grid content-center'>
                    <button onClick={() => openMusicList()} aria-label="open_music_list">
                        <SolidSvg width={'24px'} height={'24px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/music_list.svg'} />
                    </button>
                </div>
                <div className=' bg-primary-color-53 grid content-center text-center py-1 px-8 text-primary-color-83 dark:text-secondary-color rounded font-semibold'>
                    {(musicLoading && musicPlaying) ? 'Now Playing' : 'Sleeping'}
                </div>
                <div className={`flex items-center justify-end gap-6`}>
                    <button className='relative grid content-center list-opener' aria-label="open_player_menu">
                        <SolidSvg width={'24px'} height={'24px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/small_menu.svg'} />

                        <ul className='absolute hidden rounded-md p-2 bg-primary-color-53 text-secondary-color  font-semibold w-64 top-10 right-0 z-50'>
                            <li className=' py-2 my-1 mt-0 w-full hover:bg-primary-color-77 hover:text-primary-color-4 rounded-sm transition-all'>
                                Download this song
                            </li>
                            <li className=' py-2 my-1 mb-0 w-full hover:bg-primary-color-77 hover:text-primary-color-4 rounded-sm transition-all'>
                                Share this song URL
                            </li>
                        </ul>
                    </button>
                </div>
            </div>

            <div className={` relative px-8 md:px-0 h-64 min-h-64 max-h-64 lg:h-96 lg:min-h-96 lg:max-h-96 w-full sm:max-w-[675px] lg:max-w-[800px] xl:max-w-[1014px]`}>
                {(!musicLoading) ? <div className='w-scren'><Loader /></div> : <></>} 
                <div style={MoveLeftStyle} className={` relative ${styles.flexStart} transition-all duration-300 gap-40 lg:gap-52 w-full h-full`}>
                    {musicState.map(musicStateSimble => (
                        <div key={musicStateSimble.ID} className={`${musicStateSimble.ID != musicState[current].ID ? 'opacity-70 scale-75' : ''} relative flex `}>
                            <div className={` ${stylescss.darkOverlay} w-[150px] h-[150px] sm:w-[200px] sm:h-[250px] lg:w-[400px] lg:h-[370px] rounded-lg overflow-hidden z-[2] `}>
                                <img className=" h-full object-cover relative" src={(musicState[current]) ? musicStateSimble.thumbnails[0] : ''} alt="music_thumbnails" />
                            </div>
                            <div className={` ${stylescss.darkOverlay} ${stylescss.blackHoleDisk} absolute w-[125px] h-[125px] sm:w-[200px] sm:h-[200px] lg:w-[330px] lg:h-[330px] left-28 lg:left-60 rounded-full overflow-hidden top-1/2 -translate-y-1/2 z-[1] `}>
                                <img className=" h-full object-cover relative" src={(musicState[current]) ? musicStateSimble.thumbnails[0] : ''} alt="music_thumbnails" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={` grid grid-cols-[24px_2fr_24px] sm:grid-cols-[2fr_24px_24px] lg:grid-cols-[2fr_24px_24px_24px_24px_24px] gap-10 relative  text-primary-color-83 dark:text-primary-color-4 p-8 md:px-0 sm:max-w-[675px] lg:max-w-[800px] xl:max-w-[1014px] w-full`}>
                <div className='grid content-center'>
                    <button onClick={() => handleLikeMusic(musicState[current])} aria-label="Add_to_my_favorite_list">
                        {( musicState[current] && user.lovedSongs.some((lovedSong:any) => lovedSong.ID === musicState[current].ID) ) ? <SolidSvg width={'24px'} height={'24px'} color={'#ED493E'} className={''} path={'/heart.svg'} />
                        : <SolidSvg width={'24px'} height={'24px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/heart_empty.svg'} />}
                    </button>
                </div>

                <div className='relative hidden lg:grid content-center'>
                    <button onClick={nextoggleVolumeSeekBartStep} className='relative grid content-center list-opener' aria-label="volume">
                        {( volume === 0 ) ? <SolidSvg width={'24px'} height={'24px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/no-volume.svg'} />
                        : <SolidSvg width={'24px'} height={'24px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/volume.svg'} />}
                    </button>
                    <div id='volume_seekBar_container' className='absolute rotate-90 rounded-md bg-primary-color-53 text-secondary-color font-semibold w-[182px] -top-28 -right-20 z-20'>
                        <div className='seekBar scale-75'>
                            <input 
                                aria-label="Seek bar"
                                className='w-full SeekBar'
                                id='seekBar_range'
                                type='range' 
                                min={0} 
                                max={1} 
                                step={0.1}
                                value={volume} 
                                onChange={e => (dispatch(SET_VOLUME(e.target.value)))} 
                                />
                        </div>
                    </div>
                </div>

                <div className={` ${styles.flexBetween}  flex-col relative overflow-hidden text-center sm:text-left sm:order-first`}>
                    <div title={(musicState[current]) ? musicState[current].title : "Search for music by inserting the name or the URL in the input below, let's jam!"} className={` ${stylescss.elleipsAfterSecondLine} text-[100%] lg:text- font-bold mb-2 w-full`}>{(musicState[current]) ? musicState[current].title : "Search for music by inserting the name or the URL in the input below, let's jam!"}</div>
                    <div title={(musicState[current]) ? musicState[current].owner.name : ''} className={`${stylescss.elleipsAfterFirstLine} text-sm w-full`}>by {(musicState[current]) ? musicState[current].owner.name : 'ELATTAR Ayub'}</div>
                </div>

                <div className='hidden lg:grid content-center'>
                    <button onClick={() => openMusicList()} aria-label="open_music_list">
                        <SolidSvg width={'24px'} height={'24px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/music_list.svg'} />
                    </button>
                </div>

                <div  className='grid content-center'>
                    <Link href={'collections/create'} aria-label="Add_to_my_list">
                        <SolidSvg width={'24px'} height={'24px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/plus.svg'} />
                    </Link>
                </div>

                <div className={`hidden lg:flex items-center justify-end gap-6`}>
                    <button className='relative grid content-center list-opener' aria-label="open_player_menu">
                        <SolidSvg width={'24px'} height={'24px'} color={'#A1C6EA'} className={'SVGBlue2DarkBlue'} path={'/small_menu.svg'} />

                        <ul className='absolute hidden rounded-md p-2 bg-primary-color-53 text-secondary-color  font-semibold w-64 top-10 right-0 z-50'>
                            <li className=' py-2 my-1 mt-0 w-full hover:bg-primary-color-77 hover:text-primary-color-4 rounded-sm transition-all'>
                                Download this song
                            </li>
                            <li className=' py-2 my-1 mb-0 w-full hover:bg-primary-color-77 hover:text-primary-color-4 rounded-sm transition-all'>
                                Share this song URL
                            </li>
                        </ul>
                    </button>
                </div>
                
            </div>

            <div className={` ${styles.flexBetween} flex-col bg-secondary-color dark:bg-primary-color-4 p-8  rounded-t-[35px] w-full h-[333px]`}>
                <div className=' w-full sm:max-w-[675px] lg:max-w-[800px] xl:max-w-[1014px]'>
                    {<NativeVideo videoId={(musicState[current]) ? musicState[current].ID : ''} />}
                </div>
                <div className='w-full sm:max-w-[675px] lg:max-w-[800px] xl:max-w-[1014px]'>
                    <form onSubmit={searchMusic} className={` relative ${styles.flexBetween} flex-col w-full text-primary-color-4 dark:text-secondary-color `}>
                        <label className={` primary_label_form `}>
                            <span  >Music name/URL:</span>
                            <input required type="text" value={inputValue} onChange={handleChange} className='player_input'  />
                        </label>
                        
                        <button aria-label="search_music" type="button" onClick={searchMusic} className='absolute right-2 top-[30px] rounded-full bg-primary-color-77 dark:bg-primary-color-53 hover:bg-primary-color-53 dark:hover:bg-primary-color-77 transition-all flex justify-center items-center overflow-hidden w-10 h-10' >
                            <SolidSvg width={'24px'} height={'24px'} className={'SVGB2W'} path={'/search.svg'} />
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <div id='music_list_popup' className='fixed bottom-0 h-0 overflow-hidden w-full sm:max-w-[675px] lg:max-w-[800px] xl:max-w-[1014px] rounded-t-lg z-30 transition-all duration-300'>
            <MusicList mode={'player'}/>
        </div>
        
    </section>
  )
}
