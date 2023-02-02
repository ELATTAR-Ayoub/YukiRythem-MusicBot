import type { NextApiRequest, NextApiResponse } from 'next'

const { getVideo, getPlaylist, search } = require('@fabricio-191/youtube')
    .setDefaultOptions({
        language: 'en',
        location: 'US',
        quantity: 'all',
        requestsOptions: {}
    });


interface owner {
    name: string;
    ID: string;
    canonicalURL: string;
    thumbnails?: string[];
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

var Data:Data ={
    ID: '',
    URL: '',
    title: '',
    thumbnails: [],
    musicLengthSec: 0,
    owner: {
        name: '',
        ID: '',
        canonicalURL: '',
        thumbnails: [],
    },
}

const searchMusic = (string:string) => {
    return new Promise((resolve, reject) => {
        search(string, { quantity: 1 })
            .then((data: any) => {
                if (data.results.length === 0) {
                    reject(new Error("No video found"));
                } else {
                    let video = data.results.filter((el: any) => el.type === "video")[0];
                    console.log('video -------------------');
                    console.log(video);

                    Data.ID = video.ID;
                    Data.URL = video.URL;
                    Data.title = video.title;
                    Data.thumbnails = [video.thumbnails[0].url, (video.thumbnails[1] && video.thumbnails[1].url) ? video.thumbnails[1].url : null];
                    Data.owner = {
                        name: video.owner.name,
                        ID: video.owner.ID,
                        canonicalURL: video.owner.canonicalURL,
                        thumbnails: [video.owner.thumbnails[0].url],
                    };
                    Data.musicLengthSec = video.duration.number;

                    // console.log('the returned is ' + Data);
                    resolve(Data);
                }
            })
            .catch((error:Error) => {
                reject(error);
            });
    });
}

// searchMusic('quran yu baqara');

// export default function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<Data>
// ) {
//     res.status(200).json({ name: 'Seach engine | youtube', object: Data })
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        console.log('you sent =>' + req.body.string);
        const data = await searchMusic(req.body.string as string);
        
        const responseData = { ...Data, object: data };
        res.status(200).json(responseData);
    } catch (error) {
        const errorAsError = error as Error;
        const responseData:Data = {...Data, message: errorAsError.message};
        res.status(404).json(responseData);
    }
}