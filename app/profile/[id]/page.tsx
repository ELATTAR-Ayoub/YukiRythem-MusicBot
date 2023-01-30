'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link';

// auth
import { useAuth } from '@/context/AuthContext'

// styles
import styles from '../../../styles';
import stylescss from '../../styles/page.module.css';

// route
import { useRouter } from 'next/navigation';

// firebase
import { collection, addDoc, getDocs, query, where, } from "firebase/firestore";
import { auth, firestore } from '../../../config/firebase'

async function getData(uid:string) {

    const q = query(collection(firestore, "users"), where("userData.ID", "==", uid));
    const querySnapshot = await getDocs(q);
    let userData: any = {};
    querySnapshot.forEach((doc) => {
        userData = {
            ID: doc.data().userData.ID,
            avatar: doc.data().userData.avatar,
            userName: doc.data().userData.name,
            email: doc.data().userData.email,
            gender: doc.data().userData.gender,
            marketingEmails: doc.data().userData.marketingEmails,
            shareData: doc.data().userData.shareData,
            lovedSongs: doc.data().userData.lovedSongs,
            collections: doc.data().userData.collections,
            lovedCollections: doc.data().userData.lovedCollections,
        }
    });
    return userData;
}


const ProfilePage = ({ params }: any) => {

    const [profileUser, setProfileUser] = useState<any>({});

    const { user, getUser } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData(params.id);
            setProfileUser(data);
        }
        fetchData();
    }, [params.id]);

    return (
        <div>
            <h1>Profile/{profileUser.ID}</h1>
            <h1>Profile/{profileUser.userName}</h1>
            <h1>Profile/{profileUser.email}</h1>
            {(user.ID !== profileUser.ID) ? <p>Follow</p> : <p>Settings</p>}
        </div>
    );
}

export default ProfilePage;
