
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
  ID: string;
  title: string;
  desc: string;
  thumbnails: string;
  ownerID: string;
  music: Music[];
  likes: number;
  categories: string[];
  date: Date;
}

interface Card {
  Collection: Collection;
}

const CollectionCard: React.FC<Card> = ({ Collection }) => {
  const { user, getUser } = useAuth();

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
  };

  const handleLikeCollection = (ID: string) => {
  };

  return (
    <div className={` ${styles.flexCenter} bg-secondary-color dark:bg-primary-color-4 text-primary-color-4 dark:text-secondary-color w-full flex-col rounded-lg  `}>
      <div className={`relative grid grid-cols-[84px_1fr_64px] sm:grid-cols-[96px_1fr_72px] gap-3 py-4 px-3 items-center w-full `}>
          <div className='h-full'>
            <img className='w-full bg-cover' src={(Collection.thumbnails) ? Collection.thumbnails[0] : ''} alt="music_thumbnails" />
          </div>
          <p className={` ${stylescss.elleipsAfterSecondLine} text-[100%] lg:text- font-bold mb-2 w-full`}>{Collection.title}</p>
          <div className={`relative ${styles.flexCenter} gap-4 flex-col`}>
            <div className='grid content-center btn-rounded-primary'>
              <button onClick={() => handlePlayCollection(Collection.music)} aria-label="play/pause_song_button">
                {(JSON.stringify(musicState) !== JSON.stringify(Collection.music)) ? <SolidSvg width={'24px'} height={'24px'} className={'SVGB2W scale-50'} path={'/play.svg'} />
                : <SolidSvg width={'24px'} height={'24px'} className={'SVGB2W scale-50'} path={'/pause.svg'} />}
              </button>
            </div>
            <div className='grid content-center btn-rounded-primary'>
                <button onClick={() => handleLikeCollection(Collection.ID)} aria-label="open_music_list">
                    {( user.lovedCollections.includes(Collection.ID) ) ? <SolidSvg width={'24px'} height={'24px'} color={'#ED493E'} className={' scale-50'} path={'/heart.svg'} />
                  : <SolidSvg width={'24px'} height={'24px'} className={'SVGB2W scale-50'} path={'/heart_empty.svg'} />}
                </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CollectionCard;