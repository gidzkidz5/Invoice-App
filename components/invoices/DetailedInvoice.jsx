import { formatDate } from '@/helpers/others-util'
import Delete from '../buttons/Delete'
import Edit from '../buttons/Edit'
import MarkPaid from '../buttons/MarkPaid'
import styles from './DetailedInvoice.module.css'
import InvoiceStatus from './InvoiceStatus'
import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function DetailedInvoice(props) {
    const router = useRouter();
    const path = router.query.id;
    
    console.log(props.status.toLowerCase(),"1st")
    const [wantedStatus, setWantedStatus] = useState(props.status.toLowerCase());

    function changeStatus() {
        if (wantedStatus.toLowerCase() === "paid") {
            setWantedStatus("pending")
        } else {
            setWantedStatus("paid")
        }
    }

    function handleClick () {
        changeStatus();
        console.log(wantedStatus, "wantedStatus")
       
        // router.push(`/invoices/${path}`)

        return
    }

    useEffect(() => {
        if (wantedStatus !== props.status.toLowerCase()) {
            fetch(`/api/invoices/${path}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(wantedStatus)
                
            })
            .then(response => response.json())
            .then(data => {
                console.log("inside fetch")
                console.log(data); //Updated resource response
                window.location.reload();
            })
            .catch(error => {
                console.log(error)
            })
        }
    },[wantedStatus, path, props.status])

    return (
        <div className={`${styles.main} ff-sanserif`}>
            <section className={`${styles.header}`}>
                <div className={`${styles.statusContainer}`}>
                    <p className={`fs-body ${styles.grey}`}>Status</p>
                    <InvoiceStatus
                        status={props.status}
                    />
                </div>
                <div className={`${styles.btnContainer}`}>
                    <Edit
                        onClick={props.editOnClick}
                    />
                    <Delete/>
                    <MarkPaid
                        status={props.status}
                        onClick={handleClick}
                    />
                </div>
            </section>
            <section className={`${styles.detailsParent} ff-sanserif`}>
                <div className={`${styles.detailsTitle}`}>
                    <div className={`${styles.titleId}`}>
                        <h1 className={`fs-S ${styles.black}`}><span className={`${styles.grey}`}>#</span>{props.id}</h1>
                        <p className={`${styles.grey} fs-body`}>{props.description}</p>
                    </div>
                    <div className={`${styles.titleAddress} ${styles.grey} fs-body`}>
                        <p>{props.senderStreet}</p>
                        <p>{props.senderCity}</p>
                        <p>{props.senderPostCode}</p>
                        <p>{props.senderCountry}</p>
                    </div>
                </div>
                <div className={`${styles.detailsContent}`}>
                    <div className={`${styles.content1}`}>
                        <div className={`${styles.content1Child}`}>
                            <h1 className={`fs-body ${styles.grey}`}>Invoice Date</h1>
                            <h2 className={`fs-S ${styles.black}`}>{formatDate(props.createdDate)}</h2>
                        </div>
                        <div className={`${styles.content1Child}`}>
                            <h1 className={`fs-body ${styles.grey}`}>Payment Due</h1>
                            <h2 className={`fs-S ${styles.black}`}>{formatDate(props.dueDate)}</h2>
                        </div>
                    </div>
                    <div className={`${styles.content2}`}>
                        <h1 className={`fs-body ${styles.grey}`}>Bill To</h1>
                        <div>
                            <h2 className={`fs-S ${styles.black}`}>{props.clientName}</h2>
                            <div className={`${styles.grey} fs-body`}>
                                <p>{props.clientStreet}</p>
                                <p>{props.clientCity}</p>
                                <p>{props.clientPostCode}</p>
                                <p>{props.clientCountry}</p>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.content3}`}>
                        <h1 className={`fs-body ${styles.grey}`}>Sent to</h1>
                        <h2 className={`fs-S ${styles.black}`}>{props.email}</h2>
                    </div>

                </div>
                <div className={`${styles.detailsCharges}`}>
                    <div className={`${styles.chargesTop}`}>
                        <p className={`${styles.grey} ${styles.column1} fs-body`}>Item Name</p>
                        <p className={`${styles.grey} ${styles.column2} fs-body`}>QTY.</p>
                        <p className={`${styles.grey} ${styles.column3} fs-body`}>Price</p>
                        <p className={`${styles.grey} ${styles.column4} fs-body`}>Total</p>

                        {/* to be mapped */}
                        {props.items.map((item, index) => (
                            <Fragment key={index}>
                            <h2 className={`fs-S ${styles.black} ${styles.column1}`}>{item.name}</h2>
                            <h2 className={`fs-S ${styles.grey} ${styles.column2}`}>{item.quantity}</h2>
                            <h2 className={`fs-S ${styles.grey}`}>$ {item.price.toFixed(2)}</h2>
                            <h2 className={`fs-S ${styles.black}`}>$ {item.total.toFixed(2)}</h2>
                            </Fragment>
                        ))}

                    </div>
                    <div className={`${styles.chargesBottom} ff-sanserif`}>
                        <p className={`fs-body`}>Amount Due</p>
                        <span className={`${styles.totalAmt}`}>$ {props.total}</span>
                    </div>
                </div>
            </section>
        </div>
)}
      

