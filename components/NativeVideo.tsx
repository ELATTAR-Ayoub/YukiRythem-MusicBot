import React, { useState } from 'react';
// import { View, TouchableOpacity } from 'react-native';
import ReactPlayer from 'react-player'

const NativeVideo = ({ videoId }: { videoId: string }) => {
const [playing, setPlaying] = useState(true)

  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div id='jiji'>
      <ReactPlayer
        url={youtubeUrl}
        config={{
            youtube: {
                playerVars: {
                    showinfo: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    controls: 0,
                    rel: 0,
                    fs: 0,
                    disablekb: 1,
                    iv_load_policy: 3,
                    autohide: 1,
                    loop: 1,
                    mute: 1
                }
            }
        }}
        playing={playing}
        width={110}
        height={110}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
};

export default NativeVideo;