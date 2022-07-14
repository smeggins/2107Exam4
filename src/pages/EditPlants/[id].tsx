import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '@styles/Edit.module.sass';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TobysButton from '../components/TobysButton/TobysButton';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { PlantController } from '@/backEnd/dataAccessLayer/actions/plant';

const EditPlants: NextPage = (props: {plant: PlantController}) => {
    // plants new name
    const [name, setName] = useState('');
    // plants new description
    const [description, setDescription] = useState('');
    // instance of router
    const router = useRouter();
    // the value passed in the html cast as id var
    const { id } = router.query;

    // submits the form values to backend tp be updated
    async function submitChanges() {
        // the values to be sent to the back end
        let rateValues = {
            _id: id,
            name: name, 
            description: description,
            image: props.plant.imagePath
        };
        // stringify the values
        const body = JSON.stringify(rateValues);

        // make the request to update the plant
        const response = await fetch(
            'http://localhost:3000/api/updatePlant',
            {  
                method: 'PUT',
                body: body,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
            }
        );

        // Get the response data from server as JSON.
        const result = await response.json();
        // if successful re-direct to myplants page
        if (result.code == 200) {
            router.push("/MyPlants");
        }
    }

    // submits the id to the backend to delete the plant
    async function deletePlant() {
        // vals to be sent to the back-end
        let rateValues = {
            _id: id
        };
        // stringify the values
        const body = JSON.stringify(rateValues);

        // make the request to delete the plant
        const response = await fetch(
            'http://localhost:3000/api/deletePlant',
            {  
                method: 'PUT',
                body: body,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
            }
        );

        // Get the response data from server as JSON.
        const result = await response.json();
        // if successful re-direct to myplants page
        if (result.code == 200) {
            router.push("/MyPlants");
        }
    }

    return (
    <div className={styles.container}>
        <Head>
        <title>Edit Plant</title>
        <meta name="description" content="Edit your plant" />
        <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header></Header>
        <main className={styles.main}>
            <div className={styles.EditPlantsTitleContainer}>
                <h1>EDIT PLANTS</h1>    
            </div>
            <div className={styles.EditPlantsContainer}>
                <div className={styles.EditImage}><Image src={ `/plants/${props.plant.imagePath}` } alt='Plant Image' layout="fill" objectFit="contain"></Image></div>
                <div className={styles.EditPlantsValuesContainer}>
                    <div className={styles.EditPlantsNameContainer}>
                        <h2>Name</h2>
                        <input placeholder='Name' onChange={e => {setName(e.target.value);}}></input>
                    </div>
                    <div className={styles.EditPlantsDescriptionContainer}>
                        <h2>Description</h2>
                        <input placeholder='Description' onChange={e => {setDescription(e.target.value);}}></input>
                    </div>
                    <div className={styles.EditPlantsButtonContainer}>
                        <div><TobysButton name={'Done'} path={'MyPlants'} delegate={submitChanges}></TobysButton></div>
                        <div className={styles.EditButton}><TobysButton name={'Delete'} path={'MyPlants'} delegate={deletePlant}></TobysButton></div>
                    </div>
                </div>
            </div>
        </main>
        <Footer></Footer>
    </div>
    );
};

export async function getServerSideProps(router) {
    // get id from html
    const { id } = router.query;
    // get plant associated with the given id
    const queryResult = await PlantController.getPlant(id);
    // parse the results and return them
    const plant = JSON.parse(JSON.stringify(queryResult)) as PlantController;
    
    return {
        props: {
            plant
        }
    };
}

export default EditPlants;
