import styles from './SubmitButton.module.sass';

function SubmitButton({name, delegate = async () =>{}}) {
    return (
        <div className={styles.SubmitButtonContainer}>
            <button className={styles.TobysPlantButton} onClick={async () => {await delegate()}}>{name}</button>
        </div>
    );
}

export default SubmitButton;