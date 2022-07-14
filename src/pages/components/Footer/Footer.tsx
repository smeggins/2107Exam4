import Link from 'next/link';
import styles from './Footer.module.sass';

function Footer() {
    // creates a click-able link that will re-direct users to the given path
    function navLink(path: string, title:string) {
        return (
            <div className={styles.FooterItem}>
                <Link href={{ pathname: '/' + path }}>
                    <a>{title}</a>
                </Link>
            </div>
        );
    }

    // scrolls the user back to the top of the current page fluidly
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // var that contains the closing comment tag on the footer
    const closer = `@ Toby’s Plants Bros Company`;

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