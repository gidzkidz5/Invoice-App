import styles from "./PaymentTerms.module.css"
export default function PaymentTerms() {

    return (
        <div className={`${styles.child}`}>
            <label className={`fs-body ff-sanserif`} htmlFor='term'>Payment Terms</label>
            <select id="term" className={`${styles.light} ${styles.paymentTerms} fs-S2`} name="payment-terms" defaultValue={"30"}>
                <option value="1">Net 1 Day</option>
                <option value="7">Net 7 Day</option>
                <option value="14">Net 14 Day</option>
                <option value="30">Net 30 Day</option>

            </select>
        </div>

    )
}