import React, { forwardRef, useRef } from 'react'
import styles from './DatePicker.module.css'


function DatePicker(props) {
    const inputRef = useRef(null)
    
    React.useImperativeHandle(props.forwardedRef, () => inputRef.current);

    return (
    <div className={`${styles.child}`}>
        <label className={`fs-body ff-sanserif`} htmlFor='date'>Date</label>
        <input type="date" className={`${styles.main} ${styles.light} fs-S2` } 
            min="2018-01-01"
            max="2022-12-31"
            id="date"
            ref={inputRef}
        />
    </div>
    )
}

export default React.forwardRef((props, ref) => (
    <DatePicker {...props} forwardedRef={ref}/>
))