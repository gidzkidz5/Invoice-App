import { useRouter } from "next/router";
import styles from "./InvoiceItem.module.css";
import InvoiceStatus from "./InvoiceStatus";
import { capitalizeFirstLetter, formatDate } from "@/helpers/others-util";

export default function InvoiceItem(props) {
  const dueDate = formatDate(props.dueDate);
  let status;
  if (props.status) {
    status = capitalizeFirstLetter(props.status);
  }

  const router = useRouter();

  function handleClick(){
    router.push(`/invoices/${props.id}`)
  }


  return (
    <div className={`${styles.main} ff-sanserif`} onClick={handleClick}>
      <h1 className={`${styles.title} fs-S2`}><span className={`${styles.symbol}`}>#</span>{props.id}</h1>
      <p className={`${styles.date} fs-body`}>Due {dueDate}</p>
      <p className={`${styles.name} fs-body`}>{props.name}</p>
      {/* <div className={`${styles.gap}`}></div> */}
      <h1 className={`${styles.price} fs-S`}>$ {props.total}</h1>

      <div className={`${styles.container}`}>
        <InvoiceStatus status={status} />
        <div className={`${styles.arrow}`}>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="10"
            viewBox="0 0 7 10"
            fill="none"
            >
            <path d="M1 1L5 5L1 9" stroke="#7C5DFA" strokeWidth="2" />
            </svg>
        </div>
      </div>
    </div>
  );
}
