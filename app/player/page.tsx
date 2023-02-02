'use client';

import React, { useState, useEffect } from 'react'

// components
import NativeVideo from '@/components/NativeVideo';
import Loader from '@/components/loader';
import SolidSvg from '@/components/SolidSVG';
import MusicList from '@/components/MusicList';
import PlayerUI from '@/components/PlayerUI';

// styles
import styles from '@/styles/index';
import stylescss from '@/styles/page.module.css';

// redux
import { selectMusicState, selectCurrentMusic, selectMusicPlaying, selectMusicLoading, selectMusicVolume, ADD_ITEM, SET_VOLUME } from "@/store/musicSlice";
import { useDispatch, useSelector } from "react-redux";

// 
export default function Page() {
    // call redux states
    const musicState = useSelector(selectMusicState);
    const current = useSelector(selectCurrentMusic);
    const volume = useSelector(selectMusicVolume);
    const musicPlaying = useSelector(selectMusicPlaying);
    const musicLoading = useSelector(selectMusicLoading);
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
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

    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const searchMusic = (event: React.MouseEvent<HTMLButtonElement>  | React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true);
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
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        });
        // 
        setInputValue('');
        
    }


  return (
    <section className={` ${styles.flexCenter} flex-col relative overflow-hidden w-full h-[90vh]`} >
        {(loading)
        ? 
        <div className={` fixed top-0 left-0 w-screen h-screen z-50 `}>
            <Loader/>
        </div>
        :
        <></>
        }

        <div id='player' className={` ${styles.flexBetween} lg:justify-end flex-col gap-[20px] relative bg-primary-color-4 dark:bg-secondary-color overflow-hidden  h-full w-full `}>
            {/*  */}
            <PlayerUI/>
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
