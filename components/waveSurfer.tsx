import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import NativeVideo from './NativeVideo';
import ytdl from "ytdl-core";

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

// redux
import { selectMusicState, ADD_ITEM } from "../store/musicSlice";
import { useDispatch, useSelector } from "react-redux";

const formWaveSurferOptions = (ref: HTMLDivElement) => ({
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

    const waveformRef = useRef<HTMLDivElement>(null);
    const wavesurfer = useRef<any>(null);
    const [playing, setPlaying] = useState(false);
    const [current, setCurrent] = useState(0);

    function skipMusic(change: number) {
        if (change === 0) {
            setCurrent(current => current - 1);
            // console.log(musicState[current]);
        } else {
            setCurrent(current => current + 1);
            // console.log(musicState[current]);
        }
    }

    // 
    /* const downloadAndLoadVideo = async (videoId: string) => {
        try {
            // Get the video info
            let info = await ytdl.getInfo(videoId);
            // Get the audio only format
            let audioFormat = ytdl.filterFormats(info.formats, 'audioonly')[0];
            // get the url of the audio format
            let url = audioFormat.url;
            // Create a new FileReader to read the stream as a blob
            const fileReader = new FileReader();
            // Read the audio url as array buffer
            fetch(url)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => {
                    fileReader.readAsArrayBuffer(new Blob([arrayBuffer]));
                    fileReader.onload = () => {
                        // Get the blob from the FileReader
                        const blob = new Blob([fileReader.result], { type: 'audio/mpeg' });
                        // Create a URL for the blob
                        const blobUrl = URL.createObjectURL(blob);
                        console.log(blobUrl);
                        
                        // Load the blob into the wavesurfer.js player
                        const create = async () => {
                            const WaveSurfer = (await import("wavesurfer.js")).default;
                    
                            const options = waveformRef.current ? formWaveSurferOptions(waveformRef.current) : {}
                            if(waveformRef.current) {
                                const options = formWaveSurferOptions(waveformRef.current);
                                if(options.container) {
                                    wavesurfer.current = WaveSurfer.create(options);
                                    wavesurfer.current.load(blobUrl);
                                }
                            }
                        };
                        create();
                    };
                });
        } catch (err) {
            console.error(err);
        }
    } */
    
    // downloadAndLoadVideo('u0CqY27IFyo');

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

        const options = waveformRef.current ? formWaveSurferOptions(waveformRef.current) : {}
        if(waveformRef.current) {
            const options = formWaveSurferOptions(waveformRef.current);
            if(options.container) {
                wavesurfer.current = WaveSurfer.create(options);
                wavesurfer.current.load(url);
            }
        }
    };

    /* const create = async () => {
        const WaveSurfer = (await import("wavesurfer.js")).default;

        const options = waveformRef.current ? formWaveSurferOptions(waveformRef.current) : {}
        if(waveformRef.current) {
            const options = formWaveSurferOptions(waveformRef.current);
            if(options.container) {
                wavesurfer.current = WaveSurfer.create(options);
                wavesurfer.current.load(url);
            }
        }
    }; */

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
