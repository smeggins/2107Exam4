import Link from 'next/link';
import styles from './Plant.module.sass';
import plant from '../../../../public/plantA.png'
import Image from 'next/image';

function PlantComponent({name, description, imagePath}) {

    return (
        <div>
            <div className={styles.PlantContainer}>
                <div className={styles.PlantBackground}></div>
                <div className={styles.PlantImageContainer}>
                    <Image src={imagePath} alt="me" layout="fill" objectFit="contain" />
                </div>
                <div className={styles.PlantData}>
                    <h3 className={styles.PlantName}>{name}</h3>
                    <p className={styles.PlantDescription}>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default PlantComponent;