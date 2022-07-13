import styles from './TobysButton.module.sass';
import Link from 'next/link';
import { useRouter } from 'next/router';


function TobysButton({name, path, delegate = async () =>{}}) {
    const router = useRouter()
    return (
        <div className={styles.TobysButtonContainer}>
            <button className={styles.TobysPlantButton} onClick={async () => {await delegate(); router.push(`/${path}`)}}>{name}</button>
        </div>
    );
}

export default TobysButton;