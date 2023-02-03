'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link';

// auth
import { useAuth } from '@/context/AuthContext'

// styles
import styles from '@/styles';
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
import { auth, firestore } from '../../../../config/firebase'


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
    const [profileUserLovedCollections, setProfileUserLovedCollections] = useState<any>([]);
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
        <section className={` ${styles.flexStart} text-secondary-color bg-primary-color-4  dark:text-primary-color-4 dark:bg-secondary-color relative w-full p-8 flex-col gap-16 overflow-hidden min-h-[90vh] `}>
            
            {(loading)
            ? 
            <div className={` fixed top-0 left-0 w-screen h-screen z-50 `}>
                <Loader/>
            </div>
            :
            <></>
            }
            
            <div className={` grid flex-col w-full gap-4`}>
                <div id='profile_collections' className={` ${styles.flexStart} flex-col w-full`}>
                    <div className={` ${styles.flexBetween} w-full mb-4`}>
                        <h2 className={` ${styles.h1Section} `}>{`${user.userName}'s collections`}</h2>
                        {/* <Link className='link_footer whitespace-nowrap' href={`/profile/${profileUser.ID}/collections`}>See all</Link> */}
                    </div>
                    <div className={`grid grid-cols-1 lg:grid-cols-2 w-full gap-4`}>
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
            </div>
            
        </section>
    );
}

export default ProfilePage;
