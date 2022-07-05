import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@styles/PlantFinder.module.sass'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import SearchBar from './components/SearchBar/SearchBar'
import Plant from './components/Plant/Plant'

const PlantsCare: NextPage = () => {
  const test2 = ["Plant A", "Plant B", "Plant C", "Plant D", "Plant E", "Plant F"]

  function test() {
    console.log("this is a test")
  }

  

  return (
    <div className={styles.container}>
        <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header></Header>
        <main className={styles.main}>
        <SearchBar></SearchBar>

        <h1>Plants Care</h1>
        
        <div className={styles.PlantFinderResultsContainer}>
        {
        test2.map(
            (item) => {
                return (
                    <div className={styles.PlantFinderResult} key={ String(item) }>
                        {/* <h1>{item}</h1> */}
                        <Plant></Plant>
                    </div>
                );
            }
        )
        }
        </div>

        </main>
        <Footer></Footer>
    </div>
  )
}

export default PlantsCare
