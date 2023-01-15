import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import NativeVideo from './NativeVideo';

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

// redux
import { selectMusicState, ADD_ITEM } from "../store/musicSlice";
import { useDispatch, useSelector } from "react-redux";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#BBD1EA",
  progressColor: "#507DBC",
  cursorColor: "#A1C6EA",
  barWidth: 4,
  barRadius: 3,
  responsive: true,
  height: 80,
  normalize: true,
  partialRender: true
});

export default function WaveSurferComp() {

    const musicState = useSelector(selectMusicState);
    const dispatch = useDispatch();

    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [current, setCurrent] = useState(0);
    const mediaElt = useRef(null);
    useEffect(() => {
        if (mediaElt.current) {
            setAudioSrc(mediaElt.current.src);
        }
    }, [mediaElt]);

    function skipMusic(change: number) {
        console.log('jsjsjsjsjsjsjsjs');
    
        if (change === 0) {
            setCurrent(current => current - 1);
            // console.log(musicState[current]);
        } else {
            setCurrent(current => current + 1);
            // console.log(musicState[current]);
        }
    }

  const url =
    "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3";

  useEffect(() => {
    create();

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, []);

  const create = async () => {
    const WaveSurfer = (await import("wavesurfer.js")).default;

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.playPause();
  };

  return (
    /* {<div className="relative z-10">
      <div id="waveform" ref={waveformRef} />
      <div className="controls">
        <div onClick={handlePlayPause}>{!playing ? "Слушать" : "Пауза"}</div>
      </div>
    </div>} */

    <div className={` ${styles.flexBetween} flex-col w-full h-full`}>
        <div className='w-full h-1/2'>
            <div className='w-full h-[90%]'>
                {/* <NativeVideo videoId={(musicState[current]) ? musicState[current].ID : ''} /> */}
                <div id="waveform" ref={waveformRef} />
            </div>
            <div className={` flex justify-between items-center w-full `}>
                <p>00:01</p>
                <p>03:23</p>
            </div>
        </div>
        <div className={`h-1/2 grid grid-cols-[24px_1fr_24px] gap-[30px] content-center relative w-full text-primary-color-83`}>
            <div className='grid content-center'>
                <button  aria-label="shuffle_button">
                    <Image className="w-[24px] h-[24px] object-contain relative" src="/shuffle.svg" alt="shuffle_button" width={24} height={24} />
                </button>
            </div>
            <div className={` ${styles.flexBetween} relative gap-[25px]`}>
                <button onClick={() => skipMusic(0)} aria-label="skip_to_previous_song" className=' scale-[-1]'>
                    <Image className="w-[46px] h-[46px] object-contain relative" src="/next_song.svg" alt="skip_to_previous_song" width={46} height={46}/>
                </button>
                <button onClick={handlePlayPause} aria-label="play_song_button" className={` ${styles.flexCenter} w-[75px] h-[75px] rounded-full bg-primary-color-53 `}>
                    <Image className="w-[46px] h-[46px] object-contain relative" src="/play.svg" alt="play_song_button" width={46} height={46}/>
                </button>
                <button onClick={() => skipMusic(1)} aria-label="skip_to_next_song">
                    <Image className="w-[46px] h-[46px] object-contain relative" src="/next_song.svg" alt="skip_to_next_song" width={46} height={46}/>
                </button>
            </div>
            <div className='grid content-center'>
                <button  aria-label="loop_song">
                    <Image className="w-[24px] h-[24px] object-contain relative" src="/loop.svg" alt="loop_button" width={24} height={24}/>
                </button>
            </div>
        </div>
    </div>
  );
}
