
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

// Components
import SolidSvg from './SolidSVG';

// redux
import { setMusicState, selectMusicState, SET_CURRENT, selectCurrentMusic, selectMusicPlaying, selectMusicLoading, ADD_ITEM, SET_PLAYING } from "@/store/musicSlice";
import { useDispatch, useSelector } from "react-redux";

// auth
import { useAuth } from '@/context/AuthContext'

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
  ownerUserName: string;
  music: Music[];
  likes: number;
  tags: string[];
  date: Date;
  private: Boolean;
  collectionLengthSec?: number;
}

interface Card {
  Collection: Collection;
}

const CollectionCard: React.FC<Card> = ({ Collection }) => {
  const { user, likeCollection, dislikeCollection } = useAuth();
  const router = useRouter();

  // call redux states
  const musicState = useSelector(selectMusicState);
  const current = useSelector(selectCurrentMusic);
  const playing = useSelector(selectMusicPlaying);
  const musicLoading = useSelector(selectMusicLoading);
  const dispatch = useDispatch();

  const handlePlayCollection = (musicArr: Music[]) => {
    if (JSON.stringify(musicState) === JSON.stringify(musicArr)) {
      return;
    }
    dispatch(setMusicState(musicArr));
    router.push(`/collections/${Collection.UID_Col}`)
  };

  const handleLikeCollection = async (ID: string) => {

    console.log('user.lovedCollections.includes(ID)');
    console.log(user.lovedCollections.includes(ID));
    console.log(ID);
    console.log(Collection.thumbnails.length);
    

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

  return (
    <div className={` ${styles.flexCenter} bg-secondary-color dark:bg-primary-color-4 text-primary-color-4 dark:text-secondary-color w-full flex-col rounded-lg  `}>
      <div className={`relative grid grid-cols-[84px_1fr_64px_24px] sm:grid-cols-[96px_1fr_72px_24px] gap-3 py-4 px-3 items-center w-full `}>
          <div className='grid grid-cols-2 grid-rows-2 h-full'>
            <div className=''>
              <img className='h-full object-cover' src={(Collection.thumbnails) ? Collection.thumbnails[0] : ''} alt="music_thumbnails" />
            </div>
            <div className='object-cover bg-center '>
              <img className='object-cover h-full w-full' src={(Collection.thumbnails) ? Collection.thumbnails[1] : ''} alt="music_thumbnails" />
            </div>
            <div className={` ${Collection.thumbnails.length === 3 ? "col-span-2" : ""}`}>
              <img className=' h-full object-cover' src={(Collection.thumbnails) ? Collection.thumbnails[2] : ''} alt="music_thumbnails" />
            </div>

            {
              (Collection.thumbnails.length > 3)
              ?
              <div className=''>
                <img className=' h-full object-cover' src={(Collection.thumbnails) ? Collection.thumbnails[3] : ''} alt="music_thumbnails" />
              </div>
              :
              <></>
            }
            
          </div>
          
          <div className={` ${styles.flexBetween} flex-col h-full w-full gap-3`}>
            <p className={` ${stylescss.elleipsAfterSecondLine} text-lg font-bold w-full`}>{Collection.title}</p>
            <p className={` ${stylescss.elleipsAfterSecondLine} text-xs font-bold w-full`}>{Collection.desc}</p>
            <div className={` text-xs font-bold w-full`}>
            {Collection.tags.map((tags) =>
              <span className=' cursor-default  dark:bg-secondary-color bg-primary-color-4 dark:text-primary-color-4 text-secondary-color mr-1 mb-1 p-1 px-2 rounded-full' key={tags}>{tags}</span>
            )}
            </div>
            <p className={` text-xs font-bold w-full`}> {formatTime(Collection.collectionLengthSec!)}  . <Link className='underline ml-2 hover:text-primary-color-53 dark:hover:text-primary-color-77 ' href={`/profile/${Collection.ownerID}`}>{Collection.ownerUserName}</Link> </p>
          </div>

          <div className={`relative ${styles.flexCenter} gap-4 flex-col`}>
            <div className='grid content-center btn-rounded-primary'>
              <button onClick={() => handlePlayCollection(Collection.music)} aria-label="play/pause_song_button">
                {(JSON.stringify(musicState) !== JSON.stringify(Collection.music)) ? <SolidSvg width={'24px'} height={'24px'} className={'SVGW2B scale-50'} color={'#F6F8F9'} path={'/play.svg'} />
                : <SolidSvg width={'24px'} height={'24px'} className={'SVGW2B scale-50'} color={'#F6F8F9'} path={'/pause.svg'} />}
              </button>
            </div>
            <div className='grid content-center btn-rounded-primary'>
                <button onClick={() => handleLikeCollection(Collection.UID_Col)} aria-label="open_music_list">
                    {( user.lovedCollections.includes(Collection.UID_Col) ) ? <SolidSvg width={'24px'} height={'24px'} color={'#ED493E'} className={' '} path={'/heart.svg'} />
                  : <SolidSvg width={'24px'} height={'24px'} className={'SVGW2B '} color={'#F6F8F9'} path={'/heart_empty.svg'} />}
                </button>
            </div>
          </div>

          <div className={`hidden lg:flex items-center justify-end gap-6`}>
                <button className='relative grid content-center list-opener' aria-label="open_player_menu">
                    <SolidSvg width={'24px'} height={'24px'} color={'#04080F'} className={'SVGB2W'} path={'/dots-vertical.svg'} />

                  <ul className='absolute hidden rounded-md p-2 bg-primary-color-53 text-secondary-color  font-semibold w-64 top-10 right-0 z-50'>
                      
                     {(user.ID === Collection.ownerID)
                     ?
                      <li className=' py-2 my-1 mt-0 w-full hover:bg-primary-color-77 hover:text-primary-color-4 rounded-sm transition-all'>
                        Delete Collection
                      </li>
                     :
                     <></>
                     } 

                     <li className=' py-2 my-1 mb-0 w-full hover:bg-primary-color-77 hover:text-primary-color-4 rounded-sm transition-all'>
                          Copy Link
                      </li>
                      <li className=' py-2 my-1 mb-0 w-full hover:bg-primary-color-77 hover:text-primary-color-4 rounded-sm transition-all'>
                          Share Link
                      </li>
                  </ul>
              </button>
          </div>
      </div>
      
    </div>
  );
};

export default CollectionCard;