'use client';

import React, { useState } from 'react';
// import Wavesurfer from "react-wavesurfer.js";
import dynamic from 'next/dynamic'

const WaveSurferComp = () => {

    const Wavesurfer = dynamic(
        () => import('react-wavesurfer.js'),
        { ssr: false }
    )

    const [position, setPosition] = useState(0);
    const [muted, setMuted] = useState(false);

    const handlePositionChange = (position: number) => {
        /* ... */
    };

    const onReadyHandler = () => console.log("done loading!");

    return (
        <Wavesurfer
            src="https://freesound.org/data/previews/462/462807_8386274-lq.mp3"
            position={position}
            onPositionChange={handlePositionChange}
            onReady={onReadyHandler}
            playing
            muted={muted}
            
            
        />
    );

};

export default WaveSurferComp;
