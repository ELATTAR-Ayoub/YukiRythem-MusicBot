import { useAuth } from '@/context/AuthContext'

// styles
import styles from '../../../styles';
import stylescss from '../../styles/page.module.css';

// route
import { useRouter } from 'next/navigation';


async function getCollection(noteId: string) {
    
}
  
export default async function ProfilePage({ params }: any)  {
    const collection = await getCollection(params.id);

    return (
        <div>
            <h1>Collection/ID</h1>
        </div>
    );
}