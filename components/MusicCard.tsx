
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

// Components
import SolidSvg from './SolidSVG';

// redux
import { setMusicState, selectMusicState, SET_CURRENT, DELETE_ARR, selectCurrentMusic, selectMusicPlaying, selectMusicLoading, ADD_ITEM, SET_PLAYING } from "@/store/musicSlice";
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

interface Card {
  Music: Music;
}

const MusicCard: React.FC<Card> = ({ Music }) => {
  const { user, likeMusic, dislikeMusic } = useAuth();

  // call redux states
  const musicState = useSelector(selectMusicState);
  const current = useSelector(selectCurrentMusic);
  const playing = useSelector(selectMusicPlaying);
  const musicLoading = useSelector(selectMusicLoading);
  const dispatch = useDispatch();

  const handlePlayMusic = (musicObj: Music) => {
    if (musicState[current].ID === musicObj.ID) {
        dispatch(SET_PLAYING(!playing));
        return;
    }
    dispatch(ADD_ITEM(musicObj));
  };

  const handleLikeMusic = async (ID: string) => {
    if ( user.lovedSongs.includes(musicState[current].ID) ) {
        await dislikeMusic(ID);
        return;
    }

    await likeMusic(ID);
};

  return (
    <div className={` ${styles.flexCenter} bg-secondary-color dark:bg-primary-color-4 text-primary-color-4 dark:text-secondary-color w-full flex-col `}>
      <div className={`relative grid-cols-[84px_1fr_118px] sm:grid-cols-[96px_1fr_124px] gap-3 py-4 px-3 items-center w-full rounded-lg `}>
          <div className='h-full'>
            <img className='w-full bg-cover' src={(Music.thumbnails) ? Music.thumbnails[0] : ''} alt="music_thumbnails" />
          </div>
          <p className={` ${stylescss.elleipsAfterSecondLine} text-[100%] lg:text- font-bold mb-2 w-full`}>{Music.title}</p>
          <div className={`relative ${styles.flexCenter} gap-4 `}>
            <div className='grid content-center btn-rounded-primary'>
              <button onClick={() => handlePlayMusic(Music)} aria-label="play/pause_song_button">
              {(!playing || musicState[current].ID !== Music.ID) ? <SolidSvg width={'24px'} height={'24px'} className={'SVGB2W scale-50'} path={'/play.svg'} />
                : <SolidSvg width={'24px'} height={'24px'} className={'SVGB2W scale-50'} path={'/pause.svg'} />}
              </button>
            </div>
            <div className='grid content-center btn-rounded-primary'>
                <button onClick={() => handleLikeMusic(Music.ID)} aria-label="open_music_list">
                    {( user.lovedSongs.includes(Music.ID) ) ? <SolidSvg width={'24px'} height={'24px'} color={'#ED493E'} className={'scale-50'} path={'/heart.svg'} />
                  : <SolidSvg width={'24px'} height={'24px'} className={'SVGB2W scale-50'} path={'/heart_empty.svg'} />}
                </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default MusicCard;