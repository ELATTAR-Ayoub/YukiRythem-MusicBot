'use client';

import React, { useState, useEffect } from 'react'
import Link from 'next/link';

// components
import Loader from '@/components/loader';
import SolidSvg from '@/components/SolidSVG';
import MusicList from '@/components/MusicList';

// styles
import styles from '@/styles/index';
import stylescss from '@/styles/page.module.css';

// redux
import { selectMusicState, selectCurrentMusic, selectMusicPlaying, selectMusicLoading, ADD_ITEM } from "@/store/musicSlice";
import { useDispatch, useSelector } from "react-redux";

// auth
import { useAuth } from '@/context/AuthContext'

// route
import { useRouter } from 'next/navigation';

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
    thumbnails: string;
    ownerID: string;
    music: Music[];
    likes: number;
    categories: string[];
    date: Date;
}
  
export default function ProfilePage()  {
    const router = useRouter();
    const { user, AddCollection } = useAuth();
    // call redux states
    const musicState = useSelector(selectMusicState);
    const current = useSelector(selectCurrentMusic);
    const musicPlaying = useSelector(selectMusicPlaying);
    const musicLoading = useSelector(selectMusicLoading);
    const dispatch = useDispatch();

    

    const [step, setStep] = useState(1);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [tagsArr, setTagsArr] = useState<string[]>([]);

    const [titleError, setTitleError] = useState(false);
    const [titleErrorTaken, setTitleErrorTaken] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [tagsError, setTagsError] = useState(false);
    const [listError, setListError] = useState(false);
    const [listErrorStep2, setListErrorStep2] = useState(false);
    const [loading, setLoading] = useState(false);


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 30) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    if (event.target.value.length > 200) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
  }

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value);

    if (tagsArr.length > 10) {
        setTagsError(true);
      } else {
        setTagsError(false);
        const tags = event.target.value.split(',')
        setTagsArr([...tags]);
    }
    
  }


    function checkErrors() {
        if (musicState.length < 3 ) {
            setListError(true);
            nextStep(1);
            return true
        }
        if (titleError || titleErrorTaken || descriptionError || tagsError || title==='' || description==='' || tags==='') {
            setListErrorStep2(true);
            return true
        }
        return false;
    }

    function nextStep(step:number) {
        if (musicState.length < 3) {
            setListError(true)
            return
        }

        const collections_create_step1 = document.getElementById('collections_create_step1');
        const collections_create_step2 = document.getElementById('collections_create_step2');

        if (collections_create_step1 && collections_create_step2) {
            if (step === 2) {
                collections_create_step1.style.width = '0px';
                collections_create_step2.style.width = '100%';
                setStep(2);
                return
            }

            if (step === 1) {
                collections_create_step2.style.width = '0px';
                collections_create_step1.style.width = '100%';
                setStep(1);
                return
            }
        }

    }

    async function  publishCollection(event: React.MouseEvent<HTMLButtonElement>  | React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        
        if (checkErrors()) {
            return
        }

        setLoading(true);

        var collectionLengthSecTotal = 0;
        const date = new Date();
        var thumbnailsArr = [];

        musicState.forEach(music => {
            if (music.musicLengthSec) {
                collectionLengthSecTotal += music.musicLengthSec;
            }
        });

        
        console.log(musicState);
        console.log(musicState[0].thumbnails[0]);

        if (musicState.length > 3) {
            thumbnailsArr = [musicState[0].thumbnails[0], musicState[1].thumbnails[0], musicState[2].thumbnails[0], musicState[3].thumbnails[0]];
            return
        } else {
            thumbnailsArr = [musicState[0].thumbnails[0], musicState[1].thumbnails[0], musicState[2].thumbnails[0]];
        }

        const collectionData = {
            title: title,
            desc: description,
            thumbnails: [...thumbnailsArr],
            music: [...musicState],
            likes: 0,
            tags: [...tagsArr],
            date: date,
            private: false,
            collectionLengthSec: collectionLengthSecTotal,
        }

        console.log(collectionData);
        
        await AddCollection(collectionData);
        setLoading(false);
        router.push(`/profile/${user.ID}`);
    }


    return (
        <section className={` ${styles.flexCenter} text-secondary-color bg-primary-color-4  dark:text-primary-color-4 dark:bg-secondary-color relative gap-8 min-h-[90vh] w-full flex-col overflow-hidden `}>
            {(loading)
            ? 
            <div className={` fixed top-0 left-0 w-screen h-screen z-50 `}>
                <Loader/>
            </div>
            :
            <></>
            }
            
            
            <div className={` ${styles.flexStart} w-full flex-col lg:flex-row gap-0 lg:gap-6 px-8`}>
                <h1 className={` ${styles.h1Section} text-center md:text-left lg:my-0`}><span className='gradient1'>Create</span> Your Own Playlists </h1>
                <p className={`  ${styles.Paragraph} text-center md:text-left `}>{"Create and share your ultimate audio library with the world! This page lets you curate a mix of your favorite podcasts and songs in one personalized collection."}</p>
            </div>
            <div className={` ${styles.flexBetween} w-full sm:max-w-[675px] lg:max-w-[800px] gap-4 px-8 `}>
                <button onClick={()=>nextStep(1)} 
                className={` ${step === 2 ? 'bg-secondary-color dark:bg-primary-color-4 dark:text-secondary-color text-primary-color-53 min-w-20 w-24 sm:min-w-28 sm:w-28' :  'bg-primary-color-53 text-secondary-color font-semibold min-w-44 w-44 sm:min-w-56 sm:w-56' } relative rounded-full text-sm sm:text-base p-4 transition-all duration-300`} >
                    Step 1
                </button>
                <div  className={` ${step === 1 ? 'progress_bar' :  'progress_bar_2' }  w-20 md:w-3/4 transition-all duration-300`}> </div>
                <button onClick={()=>nextStep(2)} 
                className={` ${step === 1 ? 'bg-secondary-color dark:bg-primary-color-4 dark:text-secondary-color text-primary-color-53 min-w-20 w-24 sm:min-w-28 sm:w-28' :  'bg-primary-color-53 text-secondary-color font-semibold min-w-44 w-44 sm:min-w-56 sm:w-56' } relative rounded-full text-sm sm:text-base p-4 transition-all duration-300`} >
                    Step 2
                </button>
            </div>
            <div  className={` ${styles.flexCenter} flex-col w-full h-full `}>
                <div className={` ${styles.flexCenter} rounded-t-lg overflow-hidden p-8 h-full w-full sm:max-w-[675px] lg:max-w-[800px] xl:max-w-[1014px] `}>
                    <div id='collections_create_step1' className={` ${styles.flexCenter} gap-8 flex-col h-full w-full overflow-hidden `}>
                        <div className='relative bottom-0 w-full transition-all duration-300'>
                            <MusicList mode={'collection'} />
                        </div>
                        <div className={`relative ${styles.flexStart} gap-6 z-10 w-full`}>
                            <Link href="/" className={`grid content-center p-4 text-center font-bold bg-secondary-color dark:bg-primary-color-4 text-primary-color-4 dark:text-secondary-color w-full`}>Cancel</Link>
                            <button onClick={()=>nextStep(2)} className='grid content-center p-4 text-center font-bold bg-primary-color-53 text-secondary-color hover:text-primary-color-4 w-full'>Next step</button>
                        </div>
                        {listError && (
                            <p className=' text-danger-color font-normal mt-2' >
                                Add atleast 3 songs to your collections
                            </p>
                        )}
                    </div>
                    <div id='collections_create_step2' className={`relative bottom-0 left-0 ${styles.flexBetween} gap-8 flex-col dark:bg-secondary-color bg-primary-color-4 rounded-t-lg overflow-hidden h-full w-0`}>
                        <form onSubmit={publishCollection} className={` relative ${styles.flexBetween} flex-col gap-12 w-full h-full text-primary-color-4 dark:text-secondary-color pl-[3px] `}>
                            <div className={` relative ${styles.flexStart} flex-col gap-6 w-full`}>
                                <label className={` primary_label_form `}>
                                    <span  >Title</span>
                                    <input required type="text" className='player_input' value={title} onChange={handleTitleChange} />
                                    {titleError && (
                                        <p className=' text-danger-color font-normal mt-2' >
                                            Title must be between 3 and 30 characters 
                                        </p>
                                    )}
                                    {titleErrorTaken && (
                                        <p className=' text-danger-color font-normal mt-2' >
                                            This Title is already taken.
                                        </p>
                                    )}
                                </label>
                                <label className={` primary_label_form `}>
                                    <span className={` ${styles.flexBetween} wide_span `} >
                                        <span>Description</span>
                                        <span className=' font-normal text-xs'>{`max (${description.length} / 200)`}</span>
                                    </span>
                                    <input required type="text" maxLength={200} className='player_input' value={description} onChange={handleDescriptionChange} />
                                    {descriptionError && (
                                        <p className=' text-danger-color font-normal mt-2' >
                                            Description address is not valid.
                                        </p>
                                    )}
                                </label>
                                <label className={` primary_label_form `}>
                                    <span className={` ${styles.flexBetween} wide_span `} >
                                        <span>Tags</span>
                                        <span className=' font-normal text-xs'>{`comma separated, (${tagsArr.length} / 10)`}</span>
                                    </span>
                                    <input required type="tags" className='player_input' value={tags} onChange={handleTagsChange} />
                                    {tagsError && (
                                        <p className=' text-danger-color font-normal mt-2' >
                                            You can only have 10 tags for your collection.
                                        </p>
                                    )}
                                </label>
                                <div className={` ${styles.flexStart} gap-2 `}>
                                    {tagsArr.map((tag, index) => (
                                        <div  key={index} 
                                            className={` ${styles.flexStart} gap-2 bg-secondary-color dark:bg-primary-color-4 text-primary-color-4 dark:text-secondary-color rounded p-2 font-bold`}
                                        >
                                            <div onClick={() => tagsArr.splice(index, 1)}>
                                            <SolidSvg width={'24px'} height={'24px'} color={'#A1C6EA'} className={'SVGB2W cursor-pointer hover:bg-danger-color'} path={'/close.svg'} />
                                            </div>
                                            <p>{tag}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={`relative ${styles.flexStart} gap-6 z-10 w-full`}>
                                <button onClick={ () => nextStep(1)} className={`grid content-center p-4 text-center font-bold bg-secondary-color dark:bg-primary-color-4 text-primary-color-4 dark:text-secondary-color w-full`}>Go back</button>
                                <button onClick={publishCollection} type={'submit'} className='grid content-center p-4 text-center font-bold bg-primary-color-53 text-secondary-color hover:text-primary-color-4 w-full'>Publish</button>
                            </div>
                                {listErrorStep2 && (
                                    <p className=' text-danger-color font-normal mt-2' >
                                        Plz fill up all the fields first.
                                    </p>
                                )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

{/* <div className={` ${styles.flexBetween} w-full gap-4  `}>
    <button onClick={ () => nextStep(1)} className='relative bg-secondary-color dark:bg-primary-color-4 dark:text-secondary-color text-primary-color-53 rounded-full text-sm sm:text-base p-4 min-w-20 w-20 sm:min-w-24 sm:w-24'>
        Step 1
    </button>
    <div className='w-20 md:w-4/5 progress_bar '> </div>
    <button className='relative bg-primary-color-53 text-secondary-color font-semibold rounded-full text-sm sm:text-base p-4 min-w-44 w-44 sm:min-w-56 sm:w-56'>
        Step 2
    </button>
</div> */}