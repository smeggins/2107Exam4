import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@styles/Edit.module.sass'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import SearchBar from '../components/SearchBar/SearchBar'
import PlantComponent from '../components/Plant/Plant'
import Link from 'next/link'
import TobysButton from '../components/TobysButton/TobysButton'
import { useState } from 'react'
import image from '../../../public/editTemplate.png'


const EditPlants: NextPage = () => {
  const test2 = ["Plant A", "Plant B", "Plant C", "Plant D", "Plant E", "Plant F"]

  function test() {
    console.log("this is a test")
  }
  const [plantImage, setPlantImage] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  

  return (
    <div className={styles.container}>
        <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header></Header>
        <main className={styles.main}>
            <div className={styles.EditPlantsTitleContainer}>
                <h1>EDIT PLANTS</h1>    
            </div>

            <div className={styles.EditPlantsContainer}>
                <div className={styles.EditImage}><Image src={image} alt='Plant Image'></Image></div>
                <div className={styles.EditPlantsValuesContainer}>
                    <div className={styles.EditPlantsNameContainer}>
                        <h2>Name</h2>
                        <input placeholder='Name'></input>
                    </div>
                    <div className={styles.EditPlantsDescriptionContainer}>
                        <h2>Description</h2>
                        <input placeholder='Description'></input>
                    </div>
                    <div className={styles.EditPlantsButtonContainer}>
                        <div><TobysButton name={'Done'} path={'MyPlants'}></TobysButton></div>
                        <div className={styles.EditButton}><TobysButton name={'Delete'} path={'MyPlants'}></TobysButton></div>
                    </div>
                    
                </div>
            </div>
        </main>
        <Footer></Footer>
    </div>
  )
}

export default EditPlants
