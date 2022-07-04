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

    const closer = `@ Toby’s Plants Bros Company`

    return (
        <div>
            <div className={styles.FooterContainer}>
                <div className={styles.FooterLinkContainer}>
                    {navLink("", "contact us")}
                    {navLink("", "about us")}
                    {navLink("", "subscribe us")}  
                </div>
                
                {navLink("MyPlants", "back to top")}
                <h3 className={styles.FooterCloser}>{closer}</h3>
            </div>
        </div>
    );
}

export default Footer;