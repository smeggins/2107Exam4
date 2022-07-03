import Link from 'next/link';
import styles from './Footer.module.sass';

function Footer() {
    
    function navLink(path: string, title:string) {
        return (
            <div className={styles.FooterItem}>
                <Link href={{ pathname: '/' + path }}>
                    <a>{title}</a>
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className={styles.FooterContainer}>
                <div></div>
                {navLink("", "HOME")}
                {navLink("PlantsFinder", "Plants Finder")}
                {navLink("PlantsCare", "PLANTS CARE")}
                {navLink("MyPlants", "MY PLANTS")}
                <div className={styles.FooterItem}><a>USER ICON</a></div>
            </div>
        </div>
    );
}

export default Footer;