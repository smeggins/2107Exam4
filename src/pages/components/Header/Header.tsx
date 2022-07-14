import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './Header.module.sass';

function Header() {
    // the user Icon image
    const [image, setImage] = useState('/UserIcon.png')
    // the path to re-direct the browser to when clicking the user icon image
    const [path, setPath] = useState('/auth/Login')
    // instance of useRouter
    const router = useRouter()
    // session data
    const {data: session, status: loading} = useSession();

    // if session exists show logged in icon and change user icon re-direct path
    useEffect(()=> {
        if (session) {
            setImage("/userIconLoggedIn.png")
            setPath("/MyPlants")
        }
    }, [session]);

    // create a custom navlink for header that changes underlined header link based on current page 
    function navLink(path: string, title:string) {
        return (
            <div className={styles.HeaderItem}>
                <Link href={{ pathname: '/' + path }}>
                    {
                        (router.pathname.substring(1).toLowerCase() == path.toLowerCase() ) ?
                        <a className={styles.underlined}>{title.toUpperCase()}</a>
                        :
                        <a>{title.toUpperCase()}</a>
                    }
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className={styles.HeaderContainer}>
                <div></div>
                {navLink("", "HOME")}
                {navLink("PlantsFinder", "Plants Finder")}
                {navLink("PlantsCare", "PLANTS CARE")}
                {navLink("MyPlants", "MY PLANTS")}
                <div className={styles.HeaderUserIconContainer}>
                    <div className={styles.HeaderUserIcon}>
                    <Link href={{ pathname: path }}>
                        <a><Image src={image} alt="me" layout="fill" objectFit="contain" /></a>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;