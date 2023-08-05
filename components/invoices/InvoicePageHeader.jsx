import { useState } from 'react'
import AddNewInvoiceBtn from '../buttons/AddNewInvoiceBtn'
import NewInvoice from '../form/NewInvoice'
import FilterStatus from '../inputs/FilterStatus'
import styles from './InvoicePageHeader.module.css'
export default function InvoicePageHeader(props) {
    const [checked, setChecked] = useState([false, false ,false])
    

    function handleCheckboxChange(index) {
        setChecked(
            checked.map((isChecked, i) => (i === index ? !isChecked : isChecked))
          )
        props.onCheckboxChange(index)
    }

   

    return (
        <>
            <div className={`${styles.main} ff-sanserif`}>
                <div className={`${styles.textmain}`}>
                    <h1 className="fs-L">Invoices</h1>
                    <p className='fs-body'>There are {props.count} total invoices</p>
                </div>
                <div className={`${styles.uimain}`}>
                    <FilterStatus
                        onCheckboxChange={handleCheckboxChange}
                    />
                    <AddNewInvoiceBtn
                        handleClick={props.onClick}
                    />
                </div>
            </div>
        </>
    )
}