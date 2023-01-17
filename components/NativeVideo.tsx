'use client'

import React, { useState, useRef } from 'react';
import Image from 'next/image'
// import { View, TouchableOpacity } from 'react-native';
import ReactPlayer from 'react-player';

// styles
import styles from '../styles/index';
import stylescss from '../styles/page.module.css';

// redux
import { selectMusicState, selectCurrentMusic, selectMusicPlaying, selectMusicLoading, SKIP_PLUS, SKIP_PREV, SET_LOADING, SET_PLAYING } from "../store/musicSlice";
import { useDispatch, useSelector } from "react-redux";

const NativeVideo = ({ videoId }: { videoId: string }) => {
    // redux
    const musicState = useSelector(selectMusicState);
    const current = useSelector(selectCurrentMusic);
    const playing = useSelector(selectMusicPlaying);
    const MusicLoading = useSelector(selectMusicLoading);
    const dispatch = useDispatch();

    // player config
    const [volume, setVolume] = useState(0.3);
    const [looping, setLooping] = useState(false);
    const [shuffling, setShuffling] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // ref
    const playerRef = useRef(null);

    // fun
    function handleJumpTo(time: number) {
        setCurrentTime(time);
        playerRef.current?.seekTo(time);
    }

    function handleOnEnded() {
        if (musicState.length === current || (current + 1) === musicState.length) {
            dispatch(SET_PLAYING(false));
            return;
        }

        if (looping === true) {
            dispatch(SET_PLAYING(true));
            return;
        }
        
        skipMusic(1);
    }

    function seektoBegining() {
        setDuration(0);
        dispatch(SET_PLAYING(false));
        setTimeout(() => {
            dispatch(SET_PLAYING(true));
        }, 1000);
    }

    function skipMusic(change: number) {
        if (change === 0) {
            dispatch(SKIP_PREV(1));
            setDuration(0);
        } else {
            dispatch(SKIP_PLUS(1));
            setDuration(0);
        }
    }

    const handleOnBuffer = () => {
        dispatch(SET_LOADING(!MusicLoading));
    }

    const handlePlayPause = () => {
        dispatch(SET_PLAYING(!playing));
    };

    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className={` ${styles.flexBetween} flex-col gap-4 w-full`}>
        <div className='w-full h-1/3'>
            <div className='w-full h-[50%] xl:max-w-[1014px]'>
                <ReactPlayer
                    ref={playerRef}
                    url={youtubeUrl}
                    loop={looping}
                    config={{
                        youtube: {
                            playerVars: {
                                showinfo: 0,
                                modestbranding: 1,
                                playsinline: 1,
                                controls: 0,
                                rel: 0,
                                fs: 0,
                                disablekb: 1,
                                iv_load_policy: 3,
                                autohide: 1,
                                loop: 1,
                                mute: 0
                            }
                        }
                    }}
                    playing={playing}
                    width={0}
                    height={0}
                    volume={volume}
                    onBuffer={() => handleOnBuffer()}
                    onPlay={() => dispatch(SET_PLAYING(true))}
                    onPause={() => dispatch(SET_PLAYING(false))}
                    onEnded={() => handleOnEnded()}
                    onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
                    onDuration={(duration) => setDuration(duration)}
                />
                <div className='seekBar'>
                    <input 
                        aria-label="Seek bar"
                        className='w-full SeekBar'
                        id='seekBar_range'
                        type='range' 
                        min={0} 
                        max={duration} 
                        value={currentTime} 
                        onChange={e => handleJumpTo(parseFloat(e.target.value))} 
                    />
                </div>
            </div>
            <div className={` flex justify-between items-center w-full `}>
            <p>{`${Math.floor(currentTime / 60).toString().padStart(2, "0")}:${Math.floor(currentTime % 60).toString().padStart(2, "0")}`}</p>
                <p>{`${Math.floor(duration / 60).toString().padStart(2, "0")}:${Math.floor(duration % 60).toString().padStart(2, "0")}`}</p>
            </div>
        </div>
        <div className={`h-1/2 grid grid-cols-[24px_1fr_24px] gap-[30px] content-center relative text-primary-color-83  sm:max-w-[550px] w-full`}>
            <div className='grid content-center'>
                <button disabled={shuffling == false} aria-label="shuffle_button" className='disabled:opacity-50'>
                    <Image className="w-[24px] h-[24px] object-contain relative" src="/shuffle.svg" alt="shuffle_button" width={24} height={24} />
                </button>
            </div>
            <div className={` ${styles.flexCenter} relative gap-[46px]`}>
                <button onClick={() => skipMusic(0)} disabled={current === 0} aria-label="skip_to_previous_song" className=' scale-[-1] disabled:opacity-50 transition-all duration-300' >
                    <Image className="w-[46px] h-[46px] object-contain relative" src="/next_song.svg" alt="skip_to_previous_song" width={46} height={46}/>
                </button>
                <button onClick={handlePlayPause} aria-label="play/pause_song_button" className={` ${styles.flexCenter} transition-all hover:scale-110 focus:scale-90 w-[75px] h-[75px] rounded-full bg-primary-color-53 `}>
                    {(!playing) ? <Image className="w-[46px] h-[46px] object-contain relative" src="/play.svg" alt="play_song_button" width={46} height={46}/>
                    : <Image className="w-[46px] h-[46px] object-contain relative" src="/pause.svg" alt="pause_song_button" width={46} height={46}/>}
                </button>
                <button onClick={() => skipMusic(1)} disabled={(current + 1) === musicState.length || (current + 1) > musicState.length} aria-label="skip_to_next_song" className=' transition-all duration-300 disabled:opacity-50'>
                    <Image className="w-[46px] h-[46px] object-contain relative" src="/next_song.svg" alt="skip_to_next_song" width={46} height={46}/>
                </button>
            </div>
            <div onClick={() => setLooping(!looping)}  className='grid content-center'>
                <button disabled={looping == false} aria-label="loop_song" className=' disabled:opacity-50 transition-all duration-300 hover:rotate-[360deg] focus:scale-90'>
                    <Image className="w-[24px] h-[24px] object-contain relative" src="/loop.svg" alt="loop_button" width={24} height={24}/>
                </button>
            </div>
        </div>
    </div>
  );
};

export default NativeVideo;