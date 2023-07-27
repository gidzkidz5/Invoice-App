import styles from "./InvoiceStatus.module.css";

export default function InvoiceStatus(props) {

    return (
        <div className={props.status === "Paid" ? `${styles.main} ${styles.paid}` : props.status === "Pending" ? `${styles.main} ${styles.pending}` : `${styles.main} ${styles.draft}`}>
            <div className={props.status === "Paid" ? `${styles.circle} ${styles.paid}` : props.status === "Pending" ? `${styles.circle} ${styles.pending}` : `${styles.circle} ${styles.draft}`}></div>
            <span className={`${styles.status} ff-S2 ff-sanserif`}>{props.status}</span>
        </div>
    )
}