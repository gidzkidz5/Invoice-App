import styles from "./MarkPaid.module.css";

export default function MarkPaid(props) {
  return (
    <button className={`${styles.btn} ff-sanserif flex ff-S2`} onClick={props.onClick}>
      
      Mark as {props.status === 'Pending' ? "Paid" : "Pending"}
    </button>
  );
}
