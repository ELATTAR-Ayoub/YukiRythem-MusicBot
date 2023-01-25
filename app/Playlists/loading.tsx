// styles
import styles from '@/styles';
import stylescss from '@/styles/page.module.css';

// components
import Loader from '@/components/loader';

export default async function Loading() {

  return (
    <div className={` w-full h-full `}>
       <Loader/>
    </div>
  );
};