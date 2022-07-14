import styles from './TobysButton.module.sass';
import { useRouter } from 'next/router';

// represent a button that accepts a delegate and a path that it will re-direct to after executing the delegate
function TobysButton({name, path, delegate = async () =>{}}) {
    const router = useRouter()
    return (
        <div className={styles.TobysButtonContainer}>
            <button className={styles.TobysPlantButton} onClick={async () => {await delegate(); router.push(`/${path}`)}}>{name}</button>
        </div>
    );
}

export default TobysButton;