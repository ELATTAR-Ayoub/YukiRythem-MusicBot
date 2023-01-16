import React, { useState, useRef } from 'react';
import Image from 'next/image'
// import { View, TouchableOpacity } from 'react-native';
import ReactPlayer from 'react-player';

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

// redux
import { selectMusicState, selectCurrentMusic, SKIP_PLUS, SKIP_PREV } from "../store/musicSlice";
import { useDispatch, useSelector } from "react-redux";

const NativeVideo = ({ videoId }: { videoId: string }) => {
    // redux
    const musicState = useSelector(selectMusicState);
    const current = useSelector(selectCurrentMusic);
    const dispatch = useDispatch();

    // player config
    const [playing, setPlaying] = useState(true)
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const playerRef = useRef(null);

    function handleJumpTo(time: number) {
        setCurrentTime(time);
        playerRef.current.seekTo(time);
    }

    function skipMusic(change: number) {
        if (change === 0) {
            dispatch(SKIP_PREV(1));
        } else {
            dispatch(SKIP_PLUS(1));
        }
    }

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className={` ${styles.flexBetween} flex-col w-full h-full`}>
        <div className='w-full h-1/2'>
            <div className='w-full h-[90%]'>
                <ReactPlayer
                    ref={playerRef}
                    url={youtubeUrl}
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
                    width={50}
                    height={50}
                    volume={volume}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onEnded={() => setPlaying(false)}
                    onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
                    onDuration={(duration) => setDuration(duration)}
                />
                <div className='seekBar'>

                </div>
            </div>
            <div className={` flex justify-between items-center w-full `}>
            <p>{`${Math.floor(currentTime / 60).toString().padStart(2, "0")}:${Math.floor(currentTime % 60).toString().padStart(2, "0")}`}</p>
                <p>{`${Math.floor(duration / 60).toString().padStart(2, "0")}:${Math.floor(duration % 60).toString().padStart(2, "0")}`}</p>
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
                <button onClick={handlePlayPause} aria-label="play/pause_song_button" className={` ${styles.flexCenter} w-[75px] h-[75px] rounded-full bg-primary-color-53 `}>
                    {(!playing) ? <Image className="w-[46px] h-[46px] object-contain relative" src="/play.svg" alt="play_song_button" width={46} height={46}/>
                    : <Image className="w-[46px] h-[46px] object-contain relative" src="/pause.svg" alt="pause_song_button" width={46} height={46}/>}
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
};

export default NativeVideo;