import { useContext, useRef, useState } from "react";
import AddNewItem from "../buttons/AddNewItem";
import Discard from "../buttons/Discard";
import { SaveDraftButton, SaveSendButton } from "../buttons/Save";
import DatePicker from "../inputs/DatePicker";
import PaymentTerms from "../inputs/PaymentTerms";
import styles from "./NewInvoice.module.css";
import { addDaysToDate } from "@/helpers/others-util";
import { Fragment } from "react";
import { ThemeContext } from "@/ThemeContext";

export default function NewInvoice(props) {
    const { theme } = useContext(ThemeContext)

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
      console.log('clicked')
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

    const [isInputError, setisInputError] = useState(false);
  
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
        // throw new Error(data.message || "something went wrong!")
        setisInputError(true);
        console.log(isInputError)
      } else {
        window.location.reload();
        setisInputError(false);
      }

      return data
    }

    async function handleClick(e, whatStatus) {
      e.preventDefault();

      const dueDate = addDaysToDate(clientDateRef.current.value, parseInt(clientPaymentTermsRef.current.value));

      // setData((prevValue) => ({
      //   ...prevValue,
      //   id: "NE1234", //to change
      //   createdAt: clientDateRef.current.value,
      //   paymentDue: dueDate,
      //   description: clientDescriptionRef.current.value,
      //   paymentTerms: clientPaymentTermsRef.current.value,
      //   clientName: clientNameRef.current.value,
      //   clientEmail: clientEmailRef.current.value,
      //   status: whatStatus,
      //   senderAddress: {
      //     street: sellerAddressRef.current.value,
      //     city: sellerCityRef.current.value,
      //     postCode: sellerPostCodeRef.current.value,
      //     country: sellerCountryRef.current.value 
      //   },
      //   clientAddress: {
      //     street: clientAddressRef.current.value,
      //     city: clientCityRef.current.value,
      //     postCode: clientPostCodeRef.current.value,
      //     country: clientCountryRef.current.value
      //   },
      //   // items = [{ //to change
      //   //   name: "Brand Guidelines",
      //   //   quantity: 1,
      //   //   price: 1820.90,
      //   //   total: 1820.90,
         
      //   // }],
      //   items: inputFields.map((fieldObj) =>( {
      //     name: fieldObj.itemName,
      //     quantity: fieldObj.quantity,
      //     price: fieldObj.price,
      //     total: fieldObj.quantity * fieldObj.price
      //   })),
      //   total: 1800.20

      //   // inputFields.reduce((acc, obj)=> acc + obj.price, 0)
      // }))
      // console.log(data, "data before submitting")

      const updatedData = {
        ...data,
        id: "NE1234", //to change
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

      const result = await createNewInvoice(updatedData)
      
      console.log(result)
      // if (!isInputError) {
      //   window.location.reload();
      // }
      
      
      return result

  }

    
  return (

      <form className={(props.show) ? `${styles.form} ${styles.show} ${props.theme}` : `${styles.form} ${props.theme}`}>
      
        <div className="ff-sanserif">
          <h1 className={`${styles.header} fs-M ${props.theme}`}>New Invoice</h1>

          <h2 className={`${styles.title} fs-S`}>Bill Form</h2>

          <div className={`${styles.section}`}>
            <div className={`${styles.child}`}>
              <label className={`fs-body ${props.theme}`} htmlFor="address">Street Address</label>
              <input className={`${props.theme} fs-S2`} type="text" ref={sellerAddressRef}/>
            </div>

            <div className={`${styles.parent}`}>
              <div className={`${styles.child} ${styles.small}`}>
                <label className={`fs-body ${props.theme}`} htmlFor="city">City</label>
                <input className={`${props.theme} fs-S2`} type="text" ref={sellerCityRef}/>
              </div>

              <div className={`${styles.child} ${styles.small}`}>
                <label className={`fs-body ${props.theme}`} htmlFor="postcode">Post Code</label>
                <input className={`${props.theme} fs-S2`} type="text" ref={sellerPostCodeRef}/>
              </div>

              <div className={`${styles.child} ${styles.small}`}>
                <label className={`fs-body ${props.theme}`} htmlFor="country">Country</label>
                <input className={`${props.theme} fs-S2`} type="text" ref={sellerCountryRef}/>
              </div>
            </div>
          </div>

          <h2 className={`${styles.title} fs-S`}>Bill To</h2>

          <div className={`${styles.section}`}>
            <div className={`${styles.child}`}>
              <label className={`fs-body ${props.theme}`} htmlFor="name">Client's Name</label>
              <input className={`${props.theme} fs-S2`} id="name" type="text" ref={clientNameRef}/>
            </div>

            <div className={`${styles.child}`}>
              <label className={`fs-body ${props.theme}`} htmlFor="email">Client's Email</label>
              <input className={`${props.theme} fs-S2`} id="email" type="text" ref={clientEmailRef}/>
            </div>

            <div className={`${styles.child}`}>
              <label className={`fs-body ${props.theme}`} htmlFor="clientAddress">Client's Address</label>
              <input className={`${props.theme} fs-S2`} id="clientAddress" type="text" ref={clientAddressRef}/>
            </div>

            <div className={`${styles.parent}`}>
              <div className={`${styles.child} ${styles.small}`}>
                <label className={`fs-body ${props.theme}`} htmlFor="clientCity">City</label>
                <input className={`${props.theme} fs-S2`} id="clientCity" type="text" ref={clientCityRef}/>
              </div>
              <div className={`${styles.child} ${styles.small}`}>
                <label className={`fs-body ${props.theme}`} htmlFor="clientPostCode">Post Code</label>
                <input className={`${props.theme} fs-S2`} id="clientPostCode" type="text" ref={clientPostCodeRef}/>
              </div>
              <div className={`${styles.child} ${styles.small}`}>
                <label className={`fs-body ${props.theme}`} htmlFor="clientCountry">Country</label>
                <input className={`${props.theme} fs-S2`} id="clientCountry" type="text" ref={clientCountryRef}/>
              </div>
            </div>

      

            <div className={`${styles.parent} ${styles.parentPickers}`}>
              <DatePicker 
               ref={clientDateRef}
              />
              <PaymentTerms
                ref={clientPaymentTermsRef}
               />
            </div>
            <div className={`${styles.child}`}>
              <label className={`fs-body ${props.theme}`} htmlFor="description">Project Description</label>
              <input className={`${props.theme} fs-S2`} id="desciption" type="text" ref={clientDescriptionRef}/>
            </div>
          </div>

          <h2 className={`${styles.title} fs-S`} style={{ color: "#777F98" }}>
            Item List
          </h2>
          <div>
            <div className={`${styles.itemList}`}>

              <label className={`fs-body ${props.theme}`} htmlFor="itemName">Item Name</label> 
              <label className={`fs-body ${props.theme}`} htmlFor="quantity">Quantity</label>
              <label className={`fs-body ${props.theme}`} htmlFor="price">Price</label>
              <label className={`fs-body ${styles.center} ${props.theme}`} htmlFor="total">Total</label>
              <div></div>
              
              
              {inputFields.map((item) => (
                <Fragment key={item.id}>
                <input className={`${styles.itemListInput} ${props.theme} fs-S2`} type="text" id={`itemName_${item.id}`} value={item.itemName} onChange={(e) => handleChange(item.id, 'itemName', e.target.value)} key={item.id}/>
                <input className={`${styles.noArrow} ${props.theme} fs-S2 ${styles.number} ${styles.noPadding}`} type="number" id={`quantity_${item.id}`} value={item.quantity} onChange={(e) => handleChange(item.id, 'quantity', e.target.value)}/>
                <input className={`${styles.noArrow} ${props.theme} fs-S2 ${styles.number} ${styles.noPadding}`} type="number" id={`price_${item.id}`} value={item.price} onChange={(e) => handleChange(item.id, 'price', e.target.value)}/>
                <div className={`ff-sanserif ${styles.total} ${styles.center}`}>{(item.price * item.quantity).toFixed(2)}</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none" onClick={(e) => handleDeleteInputField(e, index)}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.47225 0L9.36117 0.888875H12.4722V2.66667H0.027832V0.888875H3.13892L4.02783 0H8.47225ZM2.6945 16C1.71225 16 0.916707 15.2045 0.916707 14.2222V3.55554H11.5834V14.2222C11.5834 15.2045 10.7878 16 9.80562 16H2.6945Z" fill="#888EB0"/>
                </svg>
              </Fragment>
              ))}
            </div>
            <AddNewItem
              Click={handleAddInputField}
              theme={theme}
            />
          </div>
        </div>
        <div className={`${styles.btnContainer}`}>
          <Discard
              Click={props.discardClick}
          />
          <div className={`${styles.btnChild}`}>
              <SaveDraftButton
                onClick={(e)=>handleClick(e, "draft")}
              />
              <SaveSendButton
                onClick={(e)=>handleClick(e, "pending")} 
              />
          </div>
        </div>
      
    
      
      </form>
  
    
  );
}
