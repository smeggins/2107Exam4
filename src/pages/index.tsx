import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@styles/Home.module.sass'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import PlantComponent from './components/Plant/Plant'
import headerHero from '../../public/homeHero.png'
import headerSubHero from '../../public/homeSubHero.png'
import headerSubHeroTop from '../../public/homeSubHeroTop.png'
import headerSubHeroBot from '../../public/homeSubHeroBot.png'
import TobysButton from './components/TobysButton/TobysButton'
import { PlantController } from '@/backEnd/dataAccessLayer/actions/plant'
import { Plant } from '@/shared/interfaces/Plant'

const Home: NextPage = (props: {plants: [Plant]}) => {

  return (
    <div className={styles.container}>
        <Head>
            <title>Tobys Plants Bros</title>
            <meta name="description" content="find plants to take home to toby" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header></Header>
        <main className={styles.main}>
            <div className={styles.HomeHeader}>
                <div className={styles.HomeHeroImage}><Image src={headerHero} alt="me" layout="fill" objectFit="contain" /></div>
                <h1 className={styles.HomeTitle}>TOBY’S PLANTS BROS</h1>
            </div>
            <div className={styles.HomeSubHeaderContainer}>
                <h2>PLANTS FINDER</h2>
                <p className={styles.HomeSubHeaderP}>Find the plants in our store and take them home for your Toby.</p>
            </div>
            <div className={styles.HomeSecondHeader}>
                <div className={styles.HomeSecondHeaderHero}><Image src={headerSubHero} alt="me" layout="fill" objectFit="fill" /></div>
                <div className={styles.HomeSecondHeaderTop}><Image src={headerSubHeroTop} alt="me" layout="fill" objectFit="contain" /></div>
                <div className={styles.HomeSecondHeaderBot}><Image src={headerSubHeroBot} alt="me" layout="fill" objectFit="contain" /></div>
            </div>
            <div className={styles.HomePlantContainer}>
            {
            props.plants.map(
                (item) => {
                    return (
                        <div className={styles.PlantFinderResult} key={ String(item.name) }>
                            <PlantComponent name={item.name} description={item.description} imagePath={`/plants/${item.imagePath}`}></PlantComponent>
                        </div>
                    );
                }
            )
            }
            </div>
            <div className={styles.HomeButton}>
                <TobysButton name="More Plants" path="PlantsFinder"></TobysButton>
            </div>
        </main>
        <Footer></Footer>
    </div>
  )
}

export async function getServerSideProps() {
    // get 2 plants from back-end
    const queryResult = await PlantController.getLimitedPlants();
    // parse the results into an array of plants and return them
    const plants = JSON.parse(JSON.stringify(queryResult)) as [PlantController];
    
    return {
        props: {
        plants
        }
    };
}

export default Home
