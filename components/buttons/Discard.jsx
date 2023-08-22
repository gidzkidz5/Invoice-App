import { useContext } from 'react'
import styles from './Discard.module.css'
import { ThemeContext } from '@/ThemeContext'



export default function Discard(props) {

    const { theme } =useContext(ThemeContext);

    return(
        <button 
            className={`${styles.discard} ff-sanserif fs-S2 ${theme}`}
            onClick={props.Click}
            >Discard</button>
    )
}

export function Cancel(props) {
    const { theme } = useContext(ThemeContext);

    return(
        <button 
            className={`${styles.cancel} ff-sanserif fs-S2 ${theme}`}
            onClick={props.Click}
            >Cancel</button>
    )
}