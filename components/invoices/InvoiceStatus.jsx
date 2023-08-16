import { useContext } from "react";
import styles from "./InvoiceStatus.module.css";
import { ThemeContext } from "@/ThemeContext";



export default function InvoiceStatus(props) {
    const {theme} = useContext(ThemeContext);

    return (
        <div className={props.status === "Paid" ? `${styles.main} ${styles.paid}` : props.status === "Pending" ? `${styles.main} ${styles.pending}` : `${styles.main} ${styles.draft} ${theme}`}>
            <div className={props.status === "Paid" ? `${styles.circle} ${styles.paid}` : props.status === "Pending" ? `${styles.circle} ${styles.pending}` : `${styles.circle} ${styles.draft} `}></div>
            <span className={`${styles.status} ff-S2 ff-sanserif`}>{props.status}</span>
        </div>
    )
}