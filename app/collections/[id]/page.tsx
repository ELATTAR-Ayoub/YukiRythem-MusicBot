'use client';

import React, { useState, useEffect } from 'react'
import Link from 'next/link';

// components
import NativeVideo from '@/components/NativeVideo';
import Loader from '@/components/loader';
import SolidSvg from '@/components/SolidSVG';
import MusicList from '@/components/MusicList';
import PlayerUI from '@/components/PlayerUI';

// styles
import styles from '@/styles/index';
import stylescss from '@/styles/page.module.css';

// auth
import { useAuth } from '@/context/AuthContext'

// redux
import { setMusicState, selectMusicState, selectCurrentMusic, selectMusicPlaying, selectMusicLoading, selectMusicVolume, ADD_ITEM, SET_VOLUME, DELETE_ARR } from "@/store/musicSlice";
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


interface Collection {
    UID_Col: string;
    title: string;
    desc: string;
    thumbnails: string[];
    ownerID: string;
    ownerUID_Col: string;
    ownerUserName: string;
    music: Data[];
    likes: number;
    tags: string[];
    date?: Date | number;
    private: Boolean;
    collectionLengthSec?: number;
  }

async function getData(uid:string) {
    console.log('uid -----------------');
    console.log(uid);
    
    const querySnapshot = await getDocs(collection(firestore, "collections"));
    
    let Data: Collection = {
        UID_Col: '',
        title: '',
        desc: '',
        thumbnails: [],
        ownerID: '',
        ownerUID_Col: '',
        ownerUserName: '',
        music: [],
        likes: 0,
        tags: [],
        private: false,
        collectionLengthSec: 0,
    }

    querySnapshot.forEach((doc) => {
        if (doc.id == uid) {
            console.log(doc);
            console.log(doc.data().collectionData.thumbnails);
            console.log(doc.data().collectionData.title);
            console.log('doc.data().collectionData.music');
            console.log(doc.data().collectionData.music);
            console.log(Array.isArray(doc.data().collectionData.music));
            
            Data = {
                UID_Col: doc.id,
                title: doc.data().collectionData.title,
                desc: doc.data().collectionData.desc,
                thumbnails: [...doc.data().collectionData.thumbnails],
                ownerID: doc.data().collectionData.ownerID,
                ownerUID_Col: doc.data().collectionData.ownerUID_Col,
                ownerUserName: doc.data().collectionData.ownerUserName,
                music: [...doc.data().collectionData.music],
                likes: doc.data().collectionData.likes,
                tags: [...doc.data().collectionData.tags],
                date: doc.data().collectionData.date.seconds*1000,
                private: doc.data().collectionData.private,
                collectionLengthSec: doc.data().collectionData.collectionLengthSec,
            }
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

    const { user, getUser, likeCollection, dislikeCollection } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            console.log('im here FATHER!');
            const data = await getData(params.id);
            setThisCollection(data);
            
            setLoading(false);
        }
        fetchData();
        dispatch(setMusicState(thisCollection.music));
        
    }, [params.id, thisCollection]);

    const handleLikeCollection = async (ID: string) => {
    
        if ( user.lovedCollections.includes(ID) ) {
            await dislikeCollection(ID);
            return;
        }
      
        await likeCollection(ID);
      };

      function formatTime(seconds: number) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
    
        const value = `${hours}h ${minutes}min ${remainingSeconds}s`;
        
        return value;
      }

      function formatDate(seconds: number) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
    
        const value = `${hours}h ${minutes}min ${remainingSeconds}s`;
        
        return value;
      }


  return (
    <section className={` ${styles.flexCenter} flex-col relative overflow-hidden w-full`} >
        
        {(loading)
        ? 
        <div className={` fixed top-0 left-0 w-screen h-screen z-50 `}>
            <Loader/>
        </div>
        :
        <></>
        }

        <div className={` ${styles.flexStart} flex-col relative text-secondary-color bg-primary-color-4  dark:text-primary-color-4 dark:bg-secondary-color w-full p-8 gap-4`}>
            <div className={` ${styles.flexStart} w-full flex-col gap-2 mb-2`}>
                <h1 className={` ${styles.h2Section} my-0 text-left`}>{thisCollection.title}</h1>
                <p className={` text-base md:text-lg w-full text-left `}>{thisCollection.desc}</p>
            </div>
            <div className={` ${styles.flexStart} gap-2 `}>
                { thisCollection.tags && thisCollection.tags.map((tag:any, index:number) => (
                    <div  key={index} 
                        className={` ${styles.flexStart} gap-2 bg-secondary-color dark:bg-primary-color-4 text-primary-color-4 dark:text-secondary-color rounded p-2 font-bold`}
                    >
                        <p>{tag}</p>
                    </div>
                ))}
            </div>

            <div className={` flex justify-center items-center w-full gap-2`}>
                <div className='grid grid-cols-2 content-center btn-rounded-primary'>
                    <button onClick={() => handleLikeCollection(thisCollection.UID_Col)} aria-label="open_music_list">
                        {( user.lovedCollections.includes(thisCollection.UID_Col) ) ? <SolidSvg width={'24px'} height={'24px'} color={'#ED493E'} className={' '} path={'/heart.svg'} />
                    : <SolidSvg width={'24px'} height={'24px'} className={'SVGW2B '} color={'#F6F8F9'} path={'/heart_empty.svg'} />}
                    </button>
                    {thisCollection.likes}
                </div>

                {/* <div className='grid grid-cols-2 content-center btn-rounded-primary'>
                    <button onClick={() => handleLikeCollection(thisCollection.UID_Col)} aria-label="open_music_list">
                        {( user.lovedCollections.includes(thisCollection.UID_Col) ) ? <SolidSvg width={'24px'} height={'24px'} color={'#ED493E'} className={' '} path={'/heart.svg'} />
                    : <SolidSvg width={'24px'} height={'24px'} className={'SVGW2B '} color={'#F6F8F9'} path={'/heart_empty.svg'} />}
                    </button>
                    {thisCollection.likes}
                </div> */}

                <p className={`  ${styles.Paragraph_sm} text-left `}>  <Link className='underline ml-2 hover:text-primary-color-77 dark:hover:text-primary-color-53 ' href={`/profile/${thisCollection.ownerID}`}>Made by {thisCollection.ownerUserName}</Link>  </p>

            </div>
            
            <div className={` ${styles.flexStart} w-full gap-2`}>
                <p className={`  ${styles.Paragraph_sm} text-left `}> {formatDate(thisCollection.date)} - Collection length: {formatTime(thisCollection.collectionLengthSec!)} </p>
            </div>

        </div>
        
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
