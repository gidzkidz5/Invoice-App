import { useEffect, useRef, useState } from "react";
import AddNewItem from "../buttons/AddNewItem";
import Discard, { Cancel } from "../buttons/Discard";
import { SaveChanges, SaveDraftButton, SaveSendButton } from "../buttons/Save";
import DatePicker from "../inputs/DatePicker";
import PaymentTerms from "../inputs/PaymentTerms";
import styles from "./EditInvoice.module.css";
import { addDaysToDate } from "@/helpers/others-util";
import { Fragment } from "react";

export default function EditInvoice(props) {
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
        country: null
      },
      items: [],
      total: 0
    })
    const [inputFields, setInputFields] = useState([
      {id: 1, itemName: '', quantity: 0, price: 0}
    ]);

    const handleChange = (id, field, value) => {
      setInputFields((prevInputFields) =>
        prevInputFields.map((fieldObj) => {
          if (fieldObj.id === id) {
            return { ...fieldObj, [field]: value };
          }
          return fieldObj;
        })
      );
    };
    
    //for add new item line button
    const handleAddInputField = (e) => {
      e.preventDefault();
      setInputFields((prevInputFields) => [
        ...prevInputFields,
        {
          id: Date.now(),
          itemName: '',
          quantity: 0,
          price: 0,
        },
      ]);
    };

    //for delete item line
    const handleDeleteInputField = (e, index) => {
    
      e.preventDefault();
      setInputFields(inputFields.slice(0,-1))
      console.log(inputFields)

        
    }

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
  
    async function editCurrentInvoice(inputs) {

      const response = await fetch(`../api/invoices/${props.loadedData.id}/editInvoice`, {
        method: 'PATCH',
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


    useEffect(() => {
      const { status, id, description, senderAddress, createAt, paymentDue, paymentTerms, clientName, clientAddress, clientEmail, items, total } = props.loadedData;
      

      sellerAddressRef.current.value = senderAddress.street
      sellerCityRef.current.value = senderAddress.city
      sellerPostCodeRef.current.value = senderAddress.postCode
      sellerCountryRef.current.value = senderAddress.country
      
      clientNameRef.current.value = clientName
      clientEmailRef.current.value = clientEmail
      clientAddressRef.current.value = clientAddress.street
      clientCityRef.current.value = clientAddress.city
      clientPostCodeRef.current.value = clientAddress.postCode
      clientCountryRef.current.value = clientAddress.country
      clientDateRef.current.value = createAt
      clientPaymentTermsRef.current.value = paymentTerms
      clientDescriptionRef.current.value = description

      console.log(items)
      console.log(inputFields, "before")
      const newData = items.map((single, index) => ({id: index, itemName: single.name, price: single.price, quantity: single.quantity }))
     
      console.log(newData, "TESTDIN")
      setInputFields(newData)

      console.log(inputFields, "after")

    }, [props] 
    )

    async function handleClick(e, whatStatus) {
      e.preventDefault();

      const dueDate = addDaysToDate(clientDateRef.current.value, parseInt(clientPaymentTermsRef.current.value));

      const updatedData = {
        ...data,
        id: props.loadedData.id, //to change
        createdAt: clientDateRef.current.value,
        paymentDue: dueDate,
        description: clientDescriptionRef.current.value,
        paymentTerms: clientPaymentTermsRef.current.value,
        clientName: clientNameRef.current.value,
        clientEmail: clientEmailRef.current.value,
        status: whatStatus,
        senderAddress: {
          street: sellerAddressRef.current.value,
          city: sellerCityRef.current.value,
          postCode: sellerPostCodeRef.current.value,
          country: sellerCountryRef.current.value,
        },
        clientAddress: {
          street: clientAddressRef.current.value,
          city: clientCityRef.current.value,
          postCode: clientPostCodeRef.current.value,
          country: clientCountryRef.current.value,
        },
        items: inputFields.map((fieldObj) => ({
          name: fieldObj.itemName,
          quantity: parseFloat(fieldObj.quantity),
          price: parseFloat(fieldObj.price),
          total: fieldObj.quantity * fieldObj.price,
        })),
        total: parseFloat(inputFields.reduce((acc, obj)=> acc + (parseFloat(obj.price) * parseFloat(obj.quantity)), parseFloat(0))),
        
      };

      const result = await editCurrentInvoice(updatedData)
      
      console.log(result)
      window.location.reload();
      
      return result

  }

    
  return (
    <>

      <form className={(props.show) ? `${styles.form} ${styles.show}` : `${styles.form}`}>
      
        <div className="ff-sanserif">
          <h1 className={`${styles.header} fs-M`}>Edit <span className={`${styles.hash}`}>#</span>{props.loadedData.id}</h1>

          <h2 className={`${styles.title} fs-S`}>Bill Form</h2>

          <div className={`${styles.section}`}>
            <div className={`${styles.child}`}>
              <label className="fs-body" htmlFor="address">Street Address</label>
              <input className={`light fs-S2 ${styles.fullWidth} ${styles.fullWidth2}`} type="text" ref={sellerAddressRef}/>
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
              <input className={`light fs-S2 ${styles.fullWidth} ${styles.fullWidth2}`} id="name" type="text" ref={clientNameRef}/>
            </div>

            <div className={`${styles.child}`}>
              <label className="fs-body" htmlFor="email">Client's Email</label>
              <input className={`light fs-S2 ${styles.fullWidth} ${styles.fullWidth2}`} id="email" type="text" ref={clientEmailRef}/>
            </div>

            <div className={`${styles.child}`}>
              <label className="fs-body" htmlFor="clientAddress">Client's Address</label>
              <input className={`light fs-S2 ${styles.fullWidth} ${styles.fullWidth2}`} id="clientAddress" type="text" ref={clientAddressRef}/>
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

      

            <div className={`${styles.parent} ${styles.pickers}`}>
              <DatePicker 
               ref={clientDateRef}
              />
              <PaymentTerms
                ref={clientPaymentTermsRef}
               />
            </div>
            <div className={`${styles.child}`}>
              <label className="fs-body" htmlFor="description">Project Description</label>
              <input className={`light fs-S2 ${styles.fullWidth} ${styles.fullWidth2}`} id="desciption" type="text" ref={clientDescriptionRef}/>
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
              <label className={`fs-body ${styles.center}`} htmlFor="total">Total</label>
              <div></div>
              
              
              {inputFields.map((item, index) => (
                <Fragment key={index}>
                <input className={`${styles.itemListInput} light fs-S2`} type="text" id={`itemName_${item.id}`} value={item.itemName} onChange={(e) => handleChange(item.id, 'itemName', e.target.value)} key={item.id}/>
                <input className={`${styles.noArrow} light fs-S2`} type="number" id={`quantity_${item.id}`} value={item.quantity} onChange={(e) => handleChange(item.id, 'quantity', e.target.value)}/>
                <input className={`${styles.noArrow} light fs-S2`} type="number" id={`price_${item.id}`} value={item.price} onChange={(e) => handleChange(item.id, 'price', e.target.value)}/>
                <div className={`ff-sanserif ${styles.total} ${styles.center}`}>{(item.price * item.quantity).toFixed(2)}</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none" onClick={(e) => handleDeleteInputField(e, index)}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.47225 0L9.36117 0.888875H12.4722V2.66667H0.027832V0.888875H3.13892L4.02783 0H8.47225ZM2.6945 16C1.71225 16 0.916707 15.2045 0.916707 14.2222V3.55554H11.5834V14.2222C11.5834 15.2045 10.7878 16 9.80562 16H2.6945Z" fill="#888EB0"/>
                </svg>
              </Fragment>
              ))}
            </div>
            <AddNewItem
              Click={handleAddInputField}
            />
          </div>
        </div>
        <div className={`${styles.btnContainer}`}>
          
          <div className={`${styles.btnChild}`}>
                <Cancel
                />
              <SaveChanges
                onClick={(e)=>handleClick(e, props.loadedData.status)} 
              />
          </div>
        </div>
      
    
      
      </form>
      </>
  
    
  );
}
