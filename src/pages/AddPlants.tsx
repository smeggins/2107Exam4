import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '@styles/AddPlants.module.sass';
import buttonStyles from '../pages/components/TobysButton/TobysButton.module.sass';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import { useRouter } from 'next/router';

const AddPlants: NextPage = () => {
    // sets the current plant image path
    const [plantImage, setPlantImage] = useState('');
    // router used for navigating pages
    const router = useRouter();
        
    // reference: https://nextjs.org/docs/guides/building-forms
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        // build the values to send to the back end 
        let rateValues = {
            name: event.target.Name.value, 
            description: event.target.Description.value
        };
        // stringify the values
        const body = JSON.stringify(rateValues);

        // make the request to save the new plant
        const response = await fetch(
            'http://localhost:3000/api/addPlant',
            {  
                method: 'POST',
                body: body,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
            }
        );

        // Get the response data from server as JSON.
        const result = await response.json();
        // redirect if successful
        if (result.code == 200) {
            router.push("/MyPlants");
        }
    };

  

    return (
    <div className={styles.container}>
        <Head>
        <title>Add A Plant</title>
        <meta name="description" content="Add a new plant" />
        <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header></Header>
        <form onSubmit={handleSubmit} className={styles.main}>
        
            <div className={styles.AddPlantsHeaderTitleContainer}>
                <h1>ADD PLANTS</h1>    
            </div>
            <div className={styles.AddPlantsInputsContainers}>
                <div className={styles.AddPlantsImageContainer}>
                    <h1>+</h1>
                    {/* <Image src={plantImage} alt='Plant Image'></Image> */}
                </div>
                <div className={styles.AddPlantsNameContainer}>
                    <input
                        type="text"
                        placeholder='Name'
                        name='Name'
                        required
                        minLength={2}
                        maxLength={10}>
                    </input>
                </div>
                <div className={styles.AddPlantsDescriptionContainer}>
                    <textarea
                        placeholder='Description'
                        name='Description'
                        required
                        minLength={4}
                        maxLength={50}>
                    </textarea>
                </div>
                <div className={styles.LogUpButtonContainer}>
                    <div className={buttonStyles.TobysButtonContainer}>
                        <button className={buttonStyles.TobysPlantButton} type='submit'>
                            submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
        <Footer></Footer>
    </div>
    );
};

export default AddPlants;
