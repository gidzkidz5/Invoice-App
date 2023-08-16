import { ThemeContext } from "@/ThemeContext"
import styles from "./PaymentTerms.module.css"
import React, { forwardRef, useContext, useRef } from 'react'

function PaymentTerms(props) {
    const inputRef = useRef(null)
    const{theme} = useContext(ThemeContext)

    React.useImperativeHandle(props.forwardedRef, () => inputRef.current)

    return (
        <div className={`${styles.child}`}>
            <label className={`fs-body ff-sanserif ${theme}`} htmlFor='term'>Payment Terms</label>
            <select id="term" className={`${theme} ${styles.paymentTerms} fs-S2`} name="payment-terms" defaultValue={"30"} ref={inputRef}>
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