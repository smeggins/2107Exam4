import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '@styles/PlantFinder.module.sass';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import stylesSearch from '@styles/SearchBar.module.sass';
import TobysButton from './components/TobysButton/TobysButton';
import PlantWithEdit from './components/PlantWithEdit/PlantWithEdit';
import { PlantController } from '@/backEnd/dataAccessLayer/actions/plant';
import { useEffect, useState } from 'react';
import { SearchPlants } from '@/shared/actions/search';
import searchIcon from '@public/searchIcon.png';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { UserController } from '@/backEnd/dataAccessLayer/actions/user';

const MyPlants: NextPage = (props: {plants: [PlantController?]}) => {
    // plants retrieved
    const [plants, setPlants] = useState(props.plants);
    // the value to search by
    const [searchVal, setSearchVal] = useState("");
    // 
    useEffect(() => {
        if (searchVal.replace(/\s/g, '') == "") {
            setPlants(props.plants);
        }
    }, [searchVal, props]);

    // perform search for plants
    async function search(event) {
            // perform on enter keypress
        if (event.key === 'Enter') {
            // validation if string is empty
            if (searchVal == "") {
                setPlants(props.plants);
            }
            else {
                // the result of out search for plants
                const result:[PlantController] = plants.filter(plant => plant.name.indexOf(searchVal.toUpperCase()) !== -1) as [PlantController];
                const len: number = result.length;
                // assign plants depending on result
                if (len == 0) {
                    setPlants([]);
                }
                else {
                    setPlants(result);
                }
            }
        }
    }

    return (
    <div className={styles.container}>
        <Head>
        <title>Your Plants</title>
        <meta name="description" content="A list of all your plants" />
        <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header></Header>
        <main className={styles.main}>
            <div className={stylesSearch.SearchBarContainer}>
                <div>
                    <div className={stylesSearch.SearchBarIcon}><Image src={searchIcon} alt="me" layout="fill" objectFit="contain" /></div>
                    <input className={stylesSearch.SearchBar} onChange = {e => { setSearchVal(e.currentTarget.value);}} placeholder='search' type="text" name='search' onKeyDown={search} />
                </div>
            </div>
            <div className={styles.MyPlantsHeaderContainer}>
                <div className={styles.MyPlantsHeaderTitleContainer}>
                    <h1>My Plants</h1>    
                </div>
                <div className={styles.MyPlantsButtonContainer}>
                    <TobysButton name="Add Plants" path="AddPlants"></TobysButton>
                </div>
            </div>
            <div className={styles.PlantFinderResultsContainer}>
            {
            plants.map(
                (item) => {
                    return (
                        <div className={styles.PlantFinderResult} key={ String(item._id) }>
                            <PlantWithEdit id={item._id} name={item.name} description={item.description} imagePath={item.imagePath}></PlantWithEdit>
                        </div>
                    );
                }
            )
            }
            </div>
        </main>
        <Footer></Footer>
    </div>
    );
};

export async function getServerSideProps({req}) {
    const session = await getSession({ req });
    if (!session.user.id) {
        return {
            redirect: {
              destination: "/auth/Login",
            }
          };
    }
    const user: UserController = await UserController.getUser(session.user.id);
    // get all plants
    const queryResult = await PlantController.getPlantsByIDs(user.plantIDs);
    // parse the results into an array of plants and return them
    const plants = JSON.parse(JSON.stringify(queryResult)) as [PlantController];
    
    return {
        props: {
        plants
        }
    };
}

export default MyPlants;


