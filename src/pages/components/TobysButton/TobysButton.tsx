import styles from './TobysButton.module.sass';
import Link from 'next/link';


function TobysButton({name, path, delegate = () =>{}}) {

    return (
        <div className={styles.TobysButtonContainer}>
          <Link
            href={{
                pathname: `/${path}`,
              }}>
            <button className={styles.TobysPlantButton} onClick={delegate}>{name}</button>
          </Link>
        </div>
    );
}

export default TobysButton;