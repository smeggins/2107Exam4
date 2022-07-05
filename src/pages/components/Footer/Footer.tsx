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

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const closer = `@ Toby’s Plants Bros Company`

    return (
        <div>
            <div className={styles.FooterContainer}>
                <div className={styles.FooterLinkContainer}>
                    {navLink("", "contact us")}
                    {navLink("", "about us")}
                    {navLink("", "subscribe us")}  
                </div>
                
                <a onClick={goToTop} >back to top</a>
                <h4>{closer}</h4>
            </div>
        </div>
    );
}

export default Footer;