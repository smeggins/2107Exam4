import Link from 'next/link';
import styles from './PlantWithEdit.module.sass';
import plant from '../../../../public/plantA.png'
import Image from 'next/image';
import TobysButton from '../TobysButton/TobysButton';
import { useRouter } from "next/router";
import { PlantController } from '@/backEnd/dataAccessLayer/actions/plant';

  

function PlantWithEdit(pController) {
    const path = `EditPlants/${pController.pController._id}`
    const plant: PlantController = pController
    

    return (
        <div>
            <div className={styles.PlantContainer}>
                <div className={styles.PlantBackground}></div>
                <div className={styles.PlantImageContainer}>
                    <Image src={`/plants/${pController.pController.imagePath}`} alt="me" layout="fill" objectFit="contain" />
                </div>
                <div className={styles.PlantData}>
                    <h3 className={styles.PlantName}>{pController.pController.name}</h3>
                    <p className={styles.PlantDescription}>{pController.pController.description}</p>
                    <div className={styles.PlantEditButton}><TobysButton name="Edit" path={path}></TobysButton></div>
                </div>
            </div>
        </div>
    );
}

export default PlantWithEdit;