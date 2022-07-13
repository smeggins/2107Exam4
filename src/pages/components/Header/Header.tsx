import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './Header.module.sass';
// import image from '../../../../public/UserIcon.png'

function Header() {

    const [image, setImage] = useState('/UserIcon.png')
    const [path, setPath] = useState('/auth/Login')
    const router = useRouter()
    const {data: session, status: loading} = useSession();
    useEffect(()=> {
        if (session) {
            setImage("/userIconLoggedIn.png")
            setPath("/MyPlants")
        }
    }, [session]);

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