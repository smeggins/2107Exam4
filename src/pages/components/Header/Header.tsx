import Link from 'next/link';
import styles from './Header.module.sass';

function Header() {
    
    function navLink(path: string, title:string) {
        return (
            <div className={styles.HeaderItem}>
                <Link href={{ pathname: '/' + path }}>
                    <a>{title}</a>
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
                <div className={styles.HeaderItem}><a>USER ICON</a></div>
            </div>
        </div>
    );
}

export default Header;