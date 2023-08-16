import React, { forwardRef, useContext, useRef } from 'react'
import styles from './DatePicker.module.css'
import { ThemeContext } from '@/ThemeContext';


function DatePicker(props) {
    const inputRef = useRef(null)
    const {theme} = useContext(ThemeContext)
    
    React.useImperativeHandle(props.forwardedRef, () => inputRef.current);

    return (
    <div className={`${styles.child}`}>
        <label className={`fs-body ff-sanserif ${theme}`} htmlFor='date'>Date</label>
        <input type="date" className={`${styles.main} ${theme} fs-S2` } 
            min="2018-01-01"
            
            id="date"
            ref={inputRef}
        />
    </div>
    )
}

export default React.forwardRef((props, ref) => (
    <DatePicker {...props} forwardedRef={ref}/>
))