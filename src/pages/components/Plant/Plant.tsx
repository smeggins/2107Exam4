import Link from 'next/link';
import styles from './Plant.module.sass';
import plant from '../../../../public/plantA.png'
import Image from 'next/image';

function Plant() {

    return (
        <div>
            <div className={styles.PlantContainer}>
                <div className={styles.PlantBackground}></div>
                <div className={styles.PlantImageContainer}>
                    <Image src={plant} alt="me" layout="fill" objectFit="contain" />
                </div>
                <div className={styles.PlantData}>
                    <div className={styles.PlantName}>PLANT A</div>
                    <div className={styles.PlantDescription}>The best plant for making wishes and curse people.</div>
                </div>
            </div>
        </div>
    );
}

export default Plant;