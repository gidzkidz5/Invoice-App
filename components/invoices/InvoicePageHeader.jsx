import AddNewInvoiceBtn from '../buttons/AddNewInvoiceBtn'
import NewInvoice from '../form/NewInvoice'
import FilterStatus from '../inputs/FilterStatus'
import styles from './InvoicePageHeader.module.css'
export default function InvoicePageHeader() {

    return (
        <>
            <div className={`${styles.main} ff-sanserif`}>
                <div className={`${styles.textmain}`}>
                    <h1 className="fs-L">Invoices</h1>
                    <p className='fs-body'>There are 4 pending invoices</p>
                </div>
                <div className={`${styles.uimain}`}>
                    <FilterStatus/>
                    <AddNewInvoiceBtn/>
                </div>
            </div>
        </>
    )
}