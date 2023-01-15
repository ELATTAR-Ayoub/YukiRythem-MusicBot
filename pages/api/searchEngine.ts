import type { NextApiRequest, NextApiResponse } from 'next'

const { getVideo, getPlaylist, search } = require('@fabricio-191/youtube')
    .setDefaultOptions({
        language: 'en',
        location: 'US',
        quantity: 'all',
        requestsOptions: {}
    });


interface Data {
    ytSource: string;
    songTitle: string;
    songOwner: string;
    musicLengthSec?: number;
}

var Data:Data ={
    ytSource:'',
    songTitle:'',
    songOwner:'',
}

var songList: Data[] = [];

const searchMusic = (string:string) => {
    search(string, { quantity: 40 })
        .then(data => {
            console.log(data);

            let video = data.results.filter(x => x.type === 'video');
            video = data.results[0];
            console.log(video);

            Data.ytSource = video.URL;
            Data.songTitle = video.title;
            Data.songOwner = video.owner.name;

            songList.push(Data);
            console.log('songList:' + songList[0].songTitle);

        })
        .catch(console.error);
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({ name: 'John Doe' })
}