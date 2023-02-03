'use client';

import React, { useState, useEffect } from 'react'

// components
import SolidSvg from '@/components/SolidSVG';
import EmptyListDiv from './EmptyListDiv';
import Loader from './loader';

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

// redux
import { selectMusicState, SET_CURRENT, selectCurrentMusic, selectMusicPlaying, selectMusicLoading, ADD_ITEM, DELETE_ITEM, SET_PLAYING } from "@/store/musicSlice";
import { useDispatch, useSelector } from "react-redux";

interface MusicListProb {
  mode: 'player' | 'collection',
}

const MusicList: React.FC<MusicListProb> = ({ mode = "player" }, {ref}) => {
   // call redux states
   const musicState = useSelector(selectMusicState);
   const current = useSelector(selectCurrentMusic);
   const playing = useSelector(selectMusicPlaying);
   const musicLoading = useSelector(selectMusicLoading);
   const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

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
    <div 
    className={` ${mode == 'player' ? 'dark:bg-primary-color-83 bg-primary-color-53 p-8' :  '' } 
      relative ${styles.flexEnd} flex-col w-full h-full min-h-[40vh] rounded-t-lg 
    `} >

      {(loading)
      ? 
      <div className={` fixed top-0 left-0 w-screen h-screen z-50 `}>
          <Loader/>
      </div>
      :
      <></>
      }

      {(mode == "player")
      
      ?
      <div className='grid content-center absolute -top-8 dark:bg-primary-color-83 bg-primary-color-53 rounded-t-lg p-1 right-8'>
          <button onClick={() => closeMusicList()} title='Close music list' aria-label="close music list">
              <SolidSvg width={'24px'} height={'24px'} color={'#BBD1EA'} className={'SVGW2B'} path={'/close.svg'} />
          </button>
      </div>
      :
      <></>
      }

      { (musicState && musicState.length > 0) 
      
      ? 

      <div className={`relative ${styles.flexStart} gap-4 flex-col w-full h-full max-h-[500px] py-2 overflow-y-auto `}>
          {musicState[current] && musicState.map((musicStateSimble, index) => (
              <div key={musicStateSimble.ID} className={`relative grid grid-cols-[74px_1fr_118px] sm:grid-cols-[84px_1fr_124px] gap-3 py-4 px-3 items-center w-full bg-primary-color-4 dark:bg-secondary-color rounded-lg `}>
                  <div className='h-full'>
                    <img className='w-full h-full object-cover' src={(musicState[index]) ? musicStateSimble.thumbnails[0] : ''} alt="music_thumbnails" />
                  </div>
                  <p className={` ${stylescss.elleipsAfterSecondLine} text-[100%] lg:text- font-bold mb-2 w-full`}>{musicStateSimble.title}</p>
                  <div className={`relative ${styles.flexCenter} gap-4`}>
                    <div className='grid content-center btn-rounded-secondary'>
                      <button onClick={() => handlePlayPause(index)} aria-label="play/pause_song_button">
                        {(!playing || current !== index) ? <SolidSvg width={'46px'} height={'46px'} className={'SVGB2W scale-50'} path={'/play.svg'} />
                        : <SolidSvg width={'46px'} height={'46px'} className={'SVGB2W scale-50'} path={'/pause.svg'} />}
                      </button>
                    </div>
                    <div className='grid content-center btn-rounded-secondary'>
                        <button onClick={() => handleDelete(musicStateSimble.ID)} aria-label="open_music_list">
                            <SolidSvg width={'24px'} height={'24px'} className={'SVGB2W scale-[1.5]'} path={'/garbage.svg'} />
                        </button>
                    </div>
                  </div>
              </div>
            ))}
      </div>

      :

      <div className={`relative ${styles.flexCenter} gap-4 flex-col w-full h-full overflow-y-auto `}>
          <EmptyListDiv
            header="This list is empty"
            svgPath={"/robot_resting.svg"}
            subHeader={"Try using the input bellow to add some beat!!"}
            subHeaderPath={''}
          />
      </div>
    
      }

    
      
      <form onSubmit={searchMusic} className={` relative ${styles.flexBetween} flex-col w-full text-primary-color-4 dark:text-secondary-color `}>
          <label className={` primary_label_form `}>
              <span  >Music name/URL:</span>
              <input required type="text" value={inputValue} onChange={handleChange} className='player_input'  />
          </label>
          
          <button aria-label="search_music" type="button" onClick={searchMusic} className='absolute right-2 top-[30px] btn-rounded-secondary' >
              <SolidSvg width={'24px'} height={'24px'} className={'SVGB2W'} path={(mode == 'player') ? '/search.svg' : '/plus.svg'} />
          </button>
      </form>
    </div>
  );
};

export default MusicList;