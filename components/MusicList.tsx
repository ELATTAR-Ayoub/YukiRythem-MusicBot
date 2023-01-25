'use client';

import React, { useState, useEffect } from 'react'

// components
import SolidSvg from '@/components/SolidSVG';

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

// redux
import { selectMusicState, SET_CURRENT, selectCurrentMusic, selectMusicPlaying, selectMusicLoading, ADD_ITEM, DELETE_ITEM, SET_PLAYING } from "@/store/musicSlice";
import { useDispatch, useSelector } from "react-redux";

const MusicList = () => {
   // call redux states
   const musicState = useSelector(selectMusicState);
   const current = useSelector(selectCurrentMusic);
   const playing = useSelector(selectMusicPlaying);
   const musicLoading = useSelector(selectMusicLoading);
   const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
  }

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

  const handleDelete = (id:string) => {
    console.log(id);
    
    dispatch(DELETE_ITEM(id));
  }

  const handlePlayPause = (index: number) => {
    dispatch(SET_CURRENT(index));

    if (current === index) {
      dispatch(SET_PLAYING(!playing));
    }
  };

  const closeMusicList = () => {
    const element = document.getElementById("music_list_popup");
    if (element) {
      element.style.height = '0px';
      element.style.overflow = 'hidden';
    }
  }

  return (
    <div className={`relative ${styles.flexEnd} flex-col w-full h-full bg-primary-color-83 dark:bg-primary-color-4 p-8 rounded-t-lg `}>

      <div className='grid content-center absolute -top-8 bg-primary-color-83 dark:bg-primary-color-4 rounded-t-lg p-1 right-8'>
          <button onClick={() => closeMusicList()} title='Close music list' aria-label="close music list">
              <SolidSvg width={'24px'} height={'24px'} color={'#04080F'} className={'SVGB2W'} path={'/close.svg'} />
          </button>
      </div>

      <div className={`relative ${styles.flexStart} gap-4 flex-col w-full h-full overflow-y-auto `}>
        {musicState.map((musicStateSimble, index) => (
            <div key={musicStateSimble.ID} className={`relative grid grid-cols-[96px_1fr_124px] gap-3 py-4 px-3 items-center w-full bg-primary-color-4 dark:bg-secondary-color rounded-lg `}>
                <img className='' src={(musicState[index]) ? musicStateSimble.thumbnails[0] : ''} alt="music_thumbnails" />
                <p className={` ${stylescss.elleipsAfterSecondLine} text-[100%] lg:text- font-bold mb-2 w-full`}>{musicStateSimble.title}</p>
                <div className={`relative ${styles.flexCenter} gap-4`}>
                  <div className='grid content-center btn-rounded-primary'>
                    <button onClick={() => handlePlayPause(index)} aria-label="play/pause_song_button">
                      {(!playing || current !== index) ? <SolidSvg width={'46px'} height={'46px'} className={'SVGB2W scale-50'} path={'/play.svg'} />
                      : <SolidSvg width={'46px'} height={'46px'} className={'SVGB2W scale-50'} path={'/pause.svg'} />}
                    </button>
                  </div>
                  <div className='grid content-center btn-rounded-primary'>
                      <button onClick={() => handleDelete(musicStateSimble.ID)} aria-label="open_music_list">
                          <SolidSvg width={'24px'} height={'24px'} className={'SVGB2W scale-[1.5]'} path={'/garbage.svg'} />
                      </button>
                  </div>
                </div>
            </div>
          ))}
      </div>
        
      <form onSubmit={searchMusic} className={` relative ${styles.flexBetween} flex-col w-full text-primary-color-4 dark:text-secondary-color `}>
          <label className={` relative ${stylescss.label} w-full font-semibold text-base `}>
              <span className='relative top-[38px] left-4 transition-all duration-300'>Music name/URL:</span>
              <input required type="text" value={inputValue} onChange={handleChange} className='player_input'  />
          </label>
          
          <button aria-label="search_music" type="button" onClick={searchMusic} className='absolute right-2 top-[30px] btn-rounded-primary' >
              <SolidSvg width={'24px'} height={'24px'} className={'SVGB2W'} path={'/search.svg'} />
          </button>
      </form>
    </div>
  );
};

export default MusicList;