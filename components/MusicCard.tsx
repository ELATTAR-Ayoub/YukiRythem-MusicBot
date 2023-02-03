
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

interface Data {
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
  const router = useRouter();

  // call redux states
  const musicState = useSelector(selectMusicState);
  const current = useSelector(selectCurrentMusic);
  const playing = useSelector(selectMusicPlaying);
  const musicLoading = useSelector(selectMusicLoading);
  const dispatch = useDispatch();

  const searchMusic = (inputValue:string) => {
    fetch("/api/searchEngine", {
        method: "POST",
        body: JSON.stringify({string: inputValue}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then((data:Data) => {
        dispatch(ADD_ITEM(data));
        console.log("Music added to the player!");
    })
    .catch(error => {
        console.log(error);
    });
  }

  const handlePlayMusic = (musicObj: Music) => {
    console.log(musicObj);
    console.log(musicState);
    
    /* if (musicState[current] && musicState[current].ID === musicObj.ID) {
        dispatch(SET_PLAYING(!playing));
        return;
    } */
    searchMusic(musicObj.ID);
    router.push(`/player`)
  };

  const handleLikeMusic = async (music: Music) => {
      const Music_small = {
          ID: music.ID,
          title: music.title,
          thumbnails: [music.thumbnails[0]],
      }

      if ( user.lovedSongs.some((lovedSong:any) => lovedSong.ID === Music.ID) ) {
          await dislikeMusic(Music_small);
          return;
      }
      
      await likeMusic(Music_small);
  };

  return (
    <div className={` ${styles.flexCenter} bg-secondary-color dark:bg-primary-color-4 text-primary-color-4 dark:text-secondary-color w-full rounded-lg `}>
      <div className={`relative grid grid-cols-[100%_1fr_118px] md:grid-cols-[96px_1fr_124px] gap-3 py-4 px-3 items-center w-full `}>
          <div className='h-full'>
            <img className='w-full h-full object-cover' src={(Music.thumbnails) ? Music.thumbnails[0] : ''} alt="music_thumbnails" />
          </div>
          <p className={` ${stylescss.elleipsAfterSecondLine} text-[100%] lg:text- font-bold mb-2 w-full`}>{Music.title}</p>
          <div className={`relative flex justify-end md:justify-center items-center gap-4 `}>
            <div className='grid content-center btn-rounded-primary'>
              <button onClick={() => handlePlayMusic(Music)} aria-label="play/pause_song_button">
              {(!playing || ( musicState[current] && musicState[current].ID !== Music.ID)) ? <SolidSvg width={'24px'} height={'24px'} color={'#F6F8F9'} className={'SVGW2B scale-50'} path={'/play.svg'} />
                : <SolidSvg width={'24px'} height={'24px'} color={'#F6F8F9'} className={'SVGW2B scale-50'} path={'/pause.svg'} />}
              </button>
            </div>
            <div className='grid content-center btn-rounded-primary'>
                <button onClick={() => handleLikeMusic(Music)} aria-label="open_music_list">
                    {user.lovedSongs.some((lovedSong:any) => lovedSong.ID === Music.ID ) ? <SolidSvg width={'24px'} height={'24px'} color={'#ED493E'} className={''} path={'/heart.svg'} />
                  : <SolidSvg width={'24px'} height={'24px'} color={'#F6F8F9'} className={'SVGW2B'} path={'/heart_empty.svg'} />}
                </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default MusicCard;