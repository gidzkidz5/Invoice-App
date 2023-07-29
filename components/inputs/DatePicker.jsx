import styles from './DatePicker.module.css'

export default function DatePicker() {
    return (
    <div className={`${styles.child}`}>
        <label className={`fs-body ff-sanserif`} htmlFor='date'>Date</label>
        <input type="date" className={`${styles.main} ${styles.light} fs-S2` } 
            min="2018-01-01"
            max="2022-12-31"
            id="date"
        />
    </div>
    )
}