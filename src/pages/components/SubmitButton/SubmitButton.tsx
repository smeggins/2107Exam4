import styles from './SubmitButton.module.sass';

// represents a simple submit button that accepts a delegate function
function SubmitButton({name, delegate = async () =>{}}) {
    return (
        <div className={styles.SubmitButtonContainer}>
            <button className={styles.TobysPlantButton} onClick={async () => {await delegate()}}>{name}</button>
        </div>
    );
}

export default SubmitButton;