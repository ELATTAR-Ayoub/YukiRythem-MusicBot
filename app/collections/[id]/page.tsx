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

// firebase
import { collection, getDocs, query, where, } from "firebase/firestore";
import { auth, firestore } from '../../../config/firebase'

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

async function getData(uid:string) {

    const q = query(collection(firestore, "collections", uid));
    const querySnapshot = await getDocs(q);
    let Data: any = {};
    querySnapshot.forEach((doc) => {
        Data = {
            UID_Col: doc.id,
            title: doc.data().collectionData.title,
            desc: doc.data().collectionData.desc,
            thumbnails: [...doc.data().collectionData.thumbnails],
            ownerID: doc.data().collectionData.ownerID,
            ownerUID_Col: doc.data().collectionData.ownerUID_Col,
            music: [...doc.data().collectionData.music],
            likes: doc.data().collectionData.likes,
            tags: [...doc.data().collectionData.tags],
            date: doc.data().collectionData.date,
            private: doc.data().collectionData.private,
            collectionLengthSec: doc.data().collectionData.collectionLengthSec,
        }
    });
    return Data;
}

// 
export default function Page({ params }: any) {
    // call redux states
    const musicState = useSelector(selectMusicState);
    const current = useSelector(selectCurrentMusic);
    const volume = useSelector(selectMusicVolume);
    const musicPlaying = useSelector(selectMusicPlaying);
    const musicLoading = useSelector(selectMusicLoading);
    const dispatch = useDispatch();

    const [thisCollection, setThisCollection] = useState<any>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getData(params.id);
            setThisCollection(data);
            setLoading(false);
        }
        fetchData();
    }, [params.id]);


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
            <PlayerUI/>
            <div className={` ${styles.flexBetween} flex-col bg-secondary-color dark:bg-primary-color-4 p-8  rounded-t-[35px] w-full h-[300px]`}>
                <div className=' w-full sm:max-w-[675px] lg:max-w-[800px] xl:max-w-[1014px]'>
                    {<NativeVideo videoId={(musicState[current]) ? musicState[current].ID : ''} />}
                </div>
            </div>
        </div>

        <div id='music_list_popup' className='fixed bottom-0 h-0 overflow-hidden w-full sm:max-w-[675px] lg:max-w-[800px] xl:max-w-[1014px] rounded-t-lg z-30 transition-all duration-300'>
            <MusicList mode={'player'}/>
        </div>
        
    </section>
  )
}
