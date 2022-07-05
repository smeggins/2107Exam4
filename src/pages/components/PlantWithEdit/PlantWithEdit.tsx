import Link from 'next/link';
import styles from './PlantWithEdit.module.sass';
import plant from '../../../../public/plantA.png'
import Image from 'next/image';
import TobysButton from '../TobysButton/TobysButton';
import { useRouter } from "next/router";

  

function PlantWithEdit(id) {
    const path = `EditPlants/${id}`

    return (
        <div>
            <div className={styles.PlantContainer}>
                <div className={styles.PlantBackground}></div>
                <div className={styles.PlantImageContainer}>
                    <Image src={plant} alt="me" layout="fill" objectFit="contain" />
                </div>
                <div className={styles.PlantData}>
                    <h3 className={styles.PlantName}>PLANT A</h3>
                    <p className={styles.PlantDescription}>The best plant for making wishes and curse people.</p>
                    <div className={styles.PlantEditButton}><TobysButton name="Edit" path={path}></TobysButton></div>
                </div>
            </div>
        </div>
    );
}

export default PlantWithEdit;