
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

interface EmptyListDivProps {
  header: string;
  svgPath: string;
  subHeader: string;
  subHeaderPath: string;
}

const EmptyListDiv: React.FC<EmptyListDivProps> = ({ header, svgPath, subHeader, subHeaderPath }) => {
  return (
    <div className={` ${styles.flexCenter} w-56 flex-col my-6 `}>
      <Image className='oscillating-div' src={svgPath} alt={'Empty list'} width={218} height={218} />
      <p className={` text-lg lg:text-xl my-2 w-full text-center `}>{header}</p>
      <p className={` ${styles.Paragraph_sm} w-full text-center whitespace-nowrap `}>
        {subHeader} <Link className='link_footer' href={subHeaderPath}>{subHeaderPath}</Link>
      </p>
    </div>
  );
};

export default EmptyListDiv;