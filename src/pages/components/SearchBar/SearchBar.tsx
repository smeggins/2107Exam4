import Image from 'next/image';
import styles from './SearchBar.module.sass';
import searchIcon from '../../../../public/searchIcon.png'


function SearchBar() {

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          console.log('do validate')
        }
    }

    return (
        <div className={styles.SearchBarContainer}>
            <div>
                <div className={styles.SearchBarIcon}><Image src={searchIcon} alt="me" layout="fill" objectFit="contain" /></div>
                <input className={styles.SearchBar} placeholder='search' type="text" onKeyDown={handleKeyDown} />
            </div>
        </div>
    );
}

export default SearchBar;