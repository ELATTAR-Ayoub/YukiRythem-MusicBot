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


async function getUser(noteId: string) {
    
}
  
export default function ProfilePage({ params }: any) {
    const { user } = useAuth()
    // const user = await getUser(params.id);

    return (
        <div>
            <h1>Profile/{user.ID}</h1>
            <h1>Profile/{user.userName}</h1>
            <h1>Profile/{user.email}</h1>
        </div>
    );
}