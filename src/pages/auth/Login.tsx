import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '@styles/LogUp.module.sass';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Link from 'next/link';
import plantdeco from '@public/logindeco.svg';
import { signIn } from "next-auth/react";
import SubmitButton from '../components/SubmitButton/SubmitButton';
import { useRef } from 'react';

const Login: NextPage = () => {
    // users given email address
    const email = useRef(null);
    // users given password
    const password = useRef(null);

    // uses the nextauth signin function to sign the user in
    async function logIn() {
        signIn("credentials", { email: email.current.value, password: password.current.value });
    }

  return (
    <div className={styles.container}>
        <Head>
            <title>Login</title>
            <meta name="description" content="Logs in the user" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header></Header>
        <div className={styles.plantDecoLogin}><Image src={plantdeco} alt="me" layout="fill" objectFit="contain" /></div>
        <main className={styles.main}>
            <div className={styles.LogUpTitleContainer}>
                <h1>LOGIN</h1>    
            </div>
            <div className={styles.inputContainer}>
                <input placeholder='Email' ref={email}></input>
            </div>
            <div className={styles.inputContainer}>
                <input placeholder='Password' ref={password}></input>
            </div>
            <div>
              <h4>Don’t have an account? <Link href='/auth/SignUp'><a>Create one</a></Link>.</h4>
            </div>
            <div className={styles.LogUpButtonContainer}>
                <SubmitButton name="Login" delegate={logIn}></SubmitButton>
            </div>
        </main>
        <Footer></Footer>
    </div>
  );
};

export default Login;