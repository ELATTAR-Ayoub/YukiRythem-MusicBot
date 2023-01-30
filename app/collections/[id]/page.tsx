'use client';

import { useAuth } from '@/context/AuthContext'

// styles
import styles from '../../../styles';
import stylescss from '../../styles/page.module.css';

// route
import { useRouter } from 'next/navigation';

export default function ProfilePage({ params }: any)  {

    return (
        <div>
            <h1>Collection/{params.id}</h1>
        </div>
    );
}