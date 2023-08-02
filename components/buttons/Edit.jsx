import styles from './Edit.module.css';
export default function Edit(props) {

    return (
        <button className={`${styles.btn} ff-sanserif fs-S2`} onClick={props.onClick}>
           <span>Edit</span>
        </button>
    )
}