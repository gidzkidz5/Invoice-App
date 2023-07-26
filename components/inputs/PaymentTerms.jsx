import styles from "./PaymentTerms.module.css"
export default function PaymentTerms() {

    return (
        <select id={styles.paymentTerms} className={`${styles.light} fs-S2`} name="payment-terms">
            <option value="1">Net 1 Day</option>
            <option value="7">Net 7 Day</option>
            <option value="14">Net 14 Day</option>
            <option value="30" selected>Net 30 Day</option>

        </select>

    )
}