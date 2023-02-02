'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link';

// auth
import { useAuth } from '@/context/AuthContext'

// styles
import styles from '../../../styles';
import stylescss from '../../styles/page.module.css';

// route
import { useRouter } from 'next/navigation';

// components
import SolidSvg from '@/components/SolidSVG';
import EmptyListDiv from '@/components/EmptyListDiv';
import CollectionCard from '@/components/CollectionCard';
import MusicCard from '@/components/MusicCard';
import Loader from '@/components/loader';

// firebase
import { collection, getDocs, query, where, } from "firebase/firestore";
import { auth, firestore } from '../../../config/firebase'

async function getData(uid:string) {

    const q = query(collection(firestore, "users"), where("userData.ID", "==", uid));
    const querySnapshot = await getDocs(q);
    let userData: any = {};
    querySnapshot.forEach((doc) => {
        userData = {
            ID: doc.data().userData.ID,
            UID_Col: doc.id,
            avatar: doc.data().userData.avatar,
            userName: doc.data().userData.userName,
            email: doc.data().userData.email,
            gender: doc.data().userData.gender,
            marketingEmails: doc.data().userData.marketingEmails,
            shareData: doc.data().userData.shareData,
            lovedSongs: [...doc.data().userData.lovedSongs],
            collections: [...doc.data().userData.collections],
            lovedCollections: [...doc.data().userData.lovedCollections],
            followers: [...doc.data().userData.followers] || [],
            following: [...doc.data().userData.following] || [],
        }
    });
    return userData;
}

async function getCollections(uid:string) {

    const q = query(collection(firestore, "collections"), where("collectionData.ownerID", "==", uid));
    const querySnapshot = await getDocs(q);
    let collectionsData: any = [];
    querySnapshot.forEach((doc) => {
        const Data = {
            ID: doc.data().collectionData.ID,
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
            date: doc.data().collectionData.date,
            private: doc.data().collectionData.private,
            collectionLengthSec: doc.data().collectionData.collectionLengthSec,
        }
        collectionsData.push(Data);
    });
    console.log('collectionsData');
    console.log(collectionsData);
    return collectionsData;
}

// redux
import { selectMusicState, selectCurrentMusic, selectMusicPlaying, selectMusicLoading, SKIP_PLUS, SKIP_PREV, SET_LOADING, SET_PLAYING } from "@/store/musicSlice";
import { useDispatch, useSelector } from "react-redux";

interface owner {
    name: string;
    ID: string;
    canonicalURL: string;
    thumbnails?: string[];
  }
  
  interface Music {
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
    music: Music[];
    likes: number;
    tags: string[];
    date: Date;
    private: Boolean;
    collectionLengthSec?: number;
  }

const ProfilePage = ({ params }: any) => {

    // redux
    const musicState = useSelector(selectMusicState);
    const current = useSelector(selectCurrentMusic);
    const playing = useSelector(selectMusicPlaying);
    const MusicLoading = useSelector(selectMusicLoading);
    const dispatch = useDispatch();

    const [profileUser, setProfileUser] = useState<any>({});
    const [profileUserCollections, setProfileUserCollections] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    const { user, getUser } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData(params.id);
            setProfileUser(data);
        }
        const fetchDataCollections = async () => {
            const data = await getCollections(params.id);
            setProfileUserCollections(data);
            setLoading(false);
        }
        fetchData();
        fetchDataCollections();
    }, [params.id]);

    const handlePlayPause = () => {
        dispatch(SET_PLAYING(!playing));
    };

    return (
        <section className={` ${styles.flexStart} text-secondary-color bg-primary-color-4  dark:text-primary-color-4 dark:bg-secondary-color relative w-full p-8 flex-col gap-16 overflow-hidden `}>
            
            {(loading)
            ? 
            <div className={` fixed top-0 left-0 w-screen h-screen z-50 `}>
                <Loader/>
            </div>
            :
            <></>
            }
            
            
            <div className={` relative bg-primary-color-53 w-full h-[20vh]`}>
                <div className={` grid grid-cols-[1fr_1fr] content-end absolute -bottom-8 left-0 gap-2 w-72 `}>
                    <div className='w-32 h-32 rounded overflow-hidden bg-white pointer-events-none'>
                        <img className=' w-full h-full object-cover ' src={profileUser.avatar} alt="profile_avatar" />
                    </div>
                    <h1 className={` ${styles.h1Section} whitespace-pre-wrap my-0 self-end`}>
                        {profileUser.userName}
                    </h1>
                </div>
            </div>
            <div className={` ${styles.flexBetween} w-full`}>
                <div className={` ${styles.flexStart} flex-col gap-1`}>
                    <p className={` ${styles.Paragraph_sm} my-0`}> {(profileUser.followers ) ? profileUser.followers.length : 0} Followers - {(profileUser.following ) ? profileUser.following.length : 0} Following </p>
                    {
                        (profileUser.ID !== user.ID) 
                        ?   <button className={` hover:bg-primary-color-53 hover:text-secondary-color text-primary-color-53 border border-primary-color-53 p-2 px-6 transition-all duration-300`}>
                                Follow
                            </button>
                        :   <button className={` hover:bg-primary-color-53 hover:text-secondary-color text-primary-color-53 border border-primary-color-53 p-2 px-6 transition-all duration-300`}>
                                Update profile
                            </button>
                    }
                    
                </div>
                {
                    (profileUser.collections && profileUser.collections.length > 0) 
                    ?   <button onClick={handlePlayPause} aria-label="play/pause_song_button" className={` ${styles.flexCenter} transition-all hover:scale-110 w-[64px] h-[64px] sm:w-[75px] sm:h-[75px] rounded-full bg-primary-color-53 `}>
                            {(!playing) ? <SolidSvg width={'46px'} height={'46px'} className={'SVGB2W'} path={'/play.svg'} />
                            : <SolidSvg width={'46px'} height={'46px'} className={'SVGB2W'} path={'/pause.svg'} />}
                        </button>
                    : <></>
                }
                
            </div>

            <div className={` grid grid-cols-1 flex-col w-full gap-4`}>
                <div id='profile_collections' className={` ${styles.flexBetweenEnd} flex-col w-full`}>
                    <div className={` ${styles.flexBetween} w-full mb-4`}>
                        <h2 className={` ${styles.h2Section} `}>{`${profileUser.userName}'s collections`}</h2>
                        {/* <Link className='link_footer whitespace-nowrap' href={`/profile/${profileUser.ID}/collections`}>See all</Link> */}
                    </div>
                    <div className={` ${styles.flexBetween} flex-col w-full gap-4`}>
                        {
                            (profileUserCollections && profileUserCollections.length > 0) 
                            ?   profileUserCollections.map((collection:Collection) => (
                                    <CollectionCard key={collection.UID_Col} Collection={collection} />
                                ))
                            : <EmptyListDiv
                                header="This list is empty"
                                svgPath={(profileUser.ID === user.ID)?"/galaxy-02.svg": '/galaxy-01.svg'}
                                subHeader={(profileUser.ID === user.ID)?"Create a collection at": ''}
                                subHeaderPath={(profileUser.ID === user.ID)?"/collections/create": ''}
                                />
                        }

                        
                    </div>
                </div>
                <div id='profile_loved_collections' className={` ${styles.flexBetweenEnd} flex-col w-full`}>
                    <div className={` ${styles.flexBetween} w-full mb-4`}>
                        <h2 className={` ${styles.h2Section} `}>{`Loved collections`}</h2>
                        {/* <Link className='link_footer whitespace-nowrap' href={`/profile/${profileUser.ID}/loved-collections`}>See all</Link> */}
                    </div>
                    <div className={` ${styles.flexBetween} flex-col w-full gap-4`}>
                        {
                            (profileUser.lovedCollections && profileUser.lovedCollections.length > 0) 
                            ?   profileUser.lovedCollections.map((collection:Collection) => (
                                    <CollectionCard key={collection.UID_Col} Collection={collection} />
                                ))
                            : <EmptyListDiv
                                header="This list is empty"
                                svgPath={(profileUser.ID === user.ID)?"/galaxy-02.svg": '/galaxy-01.svg'}
                                subHeader={(profileUser.ID === user.ID)?"Check new collections at": ''}
                                subHeaderPath={(profileUser.ID === user.ID)?"/collections": ''}
                                />
                        }
                    </div>
                </div>
            </div>

            <div id='profile_loved_songs' className={` ${styles.flexBetweenEnd} flex-col w-full`}>
                <div className={` ${styles.flexBetween} w-full mb-4`}>
                    <h2 className={` ${styles.h2Section} `}>{`Loved songs`}</h2>
                    {/* <Link className='link_footer whitespace-nowrap' href={`/profile/${profileUser.ID}/loved-songs`}>See all</Link> */}
                </div>
                <div className={` ${styles.flexBetween} flex-col w-full gap-4`}>
                    {
                        (profileUser.lovedSongs && profileUser.lovedSongs.length > 0) 
                        ?   
                        
                        <div className={` grid grid-cols-1 lg:grid-cols-2 flex-col w-full gap-4`}>
                            {profileUser.lovedSongs.map((music:Music) => (
                                    <MusicCard key={music.ID} Music={music} />
                                ))}
                        </div>

                        : <EmptyListDiv
                            header="This list is empty"
                            svgPath={(profileUser.ID === user.ID)?"/galaxy-02.svg": '/galaxy-01.svg'}
                            subHeader={(profileUser.ID === user.ID)?"Check new songs & podcasts at": ''}
                            subHeaderPath={(profileUser.ID === user.ID)?"/player": ''}
                            />
                    }
                </div>
            </div>
        </section>
    );
}

export default ProfilePage;
