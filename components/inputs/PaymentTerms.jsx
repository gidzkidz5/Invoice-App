import styles from "./PaymentTerms.module.css"
import React, { forwardRef, useRef } from 'react'

function PaymentTerms(props) {
    const inputRef = useRef(null)

    React.useImperativeHandle(props.forwardedRef, () => inputRef.current)

    return (
        <div className={`${styles.child}`}>
            <label className={`fs-body ff-sanserif`} htmlFor='term'>Payment Terms</label>
            <select id="term" className={`${styles.light} ${styles.paymentTerms} fs-S2`} name="payment-terms" defaultValue={"30"} ref={inputRef}>
                <option value="1">Net 1 Day</option>
                <option value="7">Net 7 Day</option>
                <option value="14">Net 14 Day</option>
                <option value="30">Net 30 Day</option>
            </select>
        </div>

    )
}

export default React.forwardRef((props, ref) => (
    <PaymentTerms {...props} forwardedRef={ref}/>
))