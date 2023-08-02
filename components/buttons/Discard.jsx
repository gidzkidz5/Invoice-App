import styles from './Discard.module.css'

export default function Discard(props) {

    return(
        <button 
            className={`${styles.discard} ff-sanserif fs-S2`}
            onClick={props.Click}
            >Discard</button>
    )
}

export function Cancel(props) {
    return(
        <button 
            className={`${styles.discard} ff-sanserif fs-S2`}
            onClick={props.Click}
            >Cancel</button>
    )
}