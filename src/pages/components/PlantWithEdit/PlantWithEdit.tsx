import styles from './PlantWithEdit.module.sass';
import Image from 'next/image';
import TobysButton from '../TobysButton/TobysButton';

// represents a plant with a name, description and an edit button
function PlantWithEdit({id, name, description, imagePath}) {
    return (
        <div>
            <div className={styles.PlantContainer}>
                <div className={styles.PlantBackground}></div>
                <div className={styles.PlantImageContainer}>
                    <Image src={`/plants/${imagePath}`} alt="me" layout="fill" objectFit="contain" />
                </div>
                <div className={styles.PlantData}>
                    <h3 className={styles.PlantName}>{name}</h3>
                    <p className={styles.PlantDescription}>{description}</p>
                    <div className={styles.PlantEditButton}><TobysButton name="Edit" path={`EditPlants/${id}`}></TobysButton></div>
                </div>
            </div>
        </div>
    );
}

export default PlantWithEdit;