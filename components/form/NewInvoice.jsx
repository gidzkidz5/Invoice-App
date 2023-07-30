import { useRef, useState } from "react";
import AddNewItem from "../buttons/AddNewItem";
import Discard from "../buttons/Discard";
import { SaveDraftButton, SaveSendButton } from "../buttons/Save";
import DatePicker from "../inputs/DatePicker";
import PaymentTerms from "../inputs/PaymentTerms";
import styles from "./NewInvoice.module.css";
import { addDaysToDate } from "@/helpers/others-util";

export default function NewInvoice(props) {
    const [data, setData] = useState({
      id: null,
      createdAt: null,
      paymentDue: null,
      description: null,
      paymentTerms: null,
      clientName: null,
      clientEmail: null,
      status: null,
      senderAddress: {
        street: null,
        city: null,
        postCode: null,
        country: null
      },
      clientAddress: {
        street: null,
        city: null,
        postCode: null,
        coutry: null
      },
      items: [{
      }],
      total: null
    })

    const sellerAddressRef = useRef();
    const sellerCityRef = useRef();
    const sellerPostCodeRef = useRef();
    const sellerCountryRef = useRef();

    const clientNameRef = useRef();
    const clientEmailRef = useRef();
    const clientAddressRef = useRef();
    const clientCityRef = useRef();
    const clientPostCodeRef = useRef();
    const clientCountryRef = useRef();
    const clientDateRef = useRef();
    const clientPaymentTermsRef = useRef();
    const clientDescriptionRef = useRef();

    

    

    async function createNewInvoice(inputs) {

      const response = await fetch('api/invoices/createInvoice', {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "something went wrong!")
      }

      return data
    }

    async function handleClick(e) {
      const dueDate = addDaysToDate(clientDateRef.current.value, parseInt(clientPaymentTermsRef.current.value))
      e.preventDefault()
      setData((prevValue) => (
        prevValue.id = "NE123", //to change
        prevValue.createdAt = clientDateRef.current.value,
        prevValue.paymentDue = dueDate,
        prevValue.description = clientDescriptionRef.current.value,
        prevValue.paymentTerms = clientPaymentTermsRef.current.value,
        prevValue.clientName = clientNameRef.current.value,
        prevValue.clientEmail = clientEmailRef.current.value,
        prevValue.status = "pending", //to change
        prevValue.senderAddress = {
          street: sellerAddressRef.current.value,
          city: sellerCityRef.current.value,
          postCode: sellerPostCodeRef.current.value,
          country: sellerCountryRef.current.value 
        },
        prevValue.clientAddress = {
          street: clientAddressRef.current.value,
          city: clientCityRef.current.value,
          postCode: clientPostCodeRef.current.value,
          country: clientCountryRef.current.value
        },
        prevValue.items = [{ //to change
          name: "Brand Guidelines",
          quantity: 1,
          price: 1820.90,
          total: 1820.90
        }],
        prevValue.total = 1820.90 //to change
      ))
      const result = await createNewInvoice(data)
      
      console.log(result)
      return result

  }

    
  return (

      <form className={(props.show) ? `${styles.form} ${styles.show}` : `${styles.form}`}>
      
        <div className="ff-sanserif">
          <h1 className={`${styles.header} fs-M`}>New Invoice</h1>

          <h2 className={`${styles.title} fs-S`}>Bill Form</h2>

          <div className={`${styles.section}`}>
            <div className={`${styles.child}`}>
              <label className="fs-body" htmlFor="address">Street Address</label>
              <input className="light fs-S2" type="text" ref={sellerAddressRef}/>
            </div>

            <div className={`${styles.parent}`}>
              <div className={`${styles.child}`}>
                <label className="fs-body" htmlFor="city">City</label>
                <input className="light fs-S2" type="text" ref={sellerCityRef}/>
              </div>

              <div className={`${styles.child}`}>
                <label className="fs-body" htmlFor="postcode">Post Code</label>
                <input className="light fs-S2" type="text" ref={sellerPostCodeRef}/>
              </div>

              <div className={`${styles.child}`}>
                <label className="fs-body" htmlFor="country">Country</label>
                <input className="light fs-S2" type="text" ref={sellerCountryRef}/>
              </div>
            </div>
          </div>

          <h2 className={`${styles.title} fs-S`}>Bill To</h2>

          <div className={`${styles.section}`}>
            <div className={`${styles.child}`}>
              <label className="fs-body" htmlFor="name">Client's Name</label>
              <input className="light fs-S2" id="name" type="text" ref={clientNameRef}/>
            </div>

            <div className={`${styles.child}`}>
              <label className="fs-body" htmlFor="email">Client's Email</label>
              <input className="light fs-S2" id="email" type="text" ref={clientEmailRef}/>
            </div>

            <div className={`${styles.child}`}>
              <label className="fs-body" htmlFor="clientAddress">Client's Address</label>
              <input className="light fs-S2" id="clientAddress" type="text" ref={clientAddressRef}/>
            </div>

            <div className={`${styles.parent}`}>
              <div className={`${styles.child}`}>
                <label className="fs-body" htmlFor="clientCity">City</label>
                <input className="light fs-S2" id="clientCity" type="text" ref={clientCityRef}/>
              </div>
              <div className={`${styles.child}`}>
                <label className="fs-body" htmlFor="clientPostCode">Post Code</label>
                <input className="light fs-S2" id="clientPostCode" type="text" ref={clientPostCodeRef}/>
              </div>
              <div className={`${styles.child}`}>
                <label className="fs-body" htmlFor="clientCountry">Country</label>
                <input className="light fs-S2" id="clientCountry" type="text" ref={clientCountryRef}/>
              </div>
            </div>

      

            <div className={`${styles.parent}`}>
              <DatePicker 
               ref={clientDateRef}
              />
              <PaymentTerms
                ref={clientPaymentTermsRef}
               />
            </div>
            <div className={`${styles.child}`}>
              <label className="fs-body" htmlFor="description">Project Description</label>
              <input className="light fs-S2" id="desciption" type="text" ref={clientDescriptionRef}/>
            </div>
          </div>

          <h2 className={`${styles.title} fs-S`} style={{ color: "#777F98" }}>
            Item List
          </h2>
          <div>
            <div className={`${styles.itemList}`}>

              <label className="fs-body" htmlFor="itemName">Item Name</label> 
              <label className="fs-body" htmlFor="quantity">Quantity</label>
              <label className="fs-body" htmlFor="price">Price</label>
              <label className="fs-body" htmlFor="total">Total</label>
              
              
              <input className={`${styles.itemListInput} light fs-S2`} type="text" id="itemName"/>
              <input className={`${styles.noArrow} light fs-S2`} type="number" id="quantity"/>
              <input className={`${styles.noArrow} light fs-S2`} type="number" id="price" />
              <div>154</div>
            </div>
            <AddNewItem/>
          </div>
        </div>
        <div className={`${styles.btnContainer}`}>
          <Discard
              Click={handleClick}
          />
          <div className={`${styles.btnChild}`}>
              <SaveDraftButton
                onClick={handleClick}
              />
              <SaveSendButton
                onClick={handleClick} 
              />
          </div>
        </div>
      
    
      
      </form>
  
    
  );
}
