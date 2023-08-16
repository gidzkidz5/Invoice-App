import { useContext } from 'react';
import styles from './Edit.module.css';
import { ThemeContext } from '@/ThemeContext';
export default function Edit(props) {
const { theme } = useContext(ThemeContext)
    return (
        <button className={`${styles.btn} ff-sanserif fs-S2 ${theme}`} onClick={props.onClick}>
           <span>Edit</span>
        </button>
    )
}