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
      {id: 0, itemName: '', quantity: 0, price: 0}
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
          id: prevInputFields.length,
          itemName: '',
          quantity: 0,
          price: 0,
        },
      ]);
    };

    const handleDeleteInputField = (e, index) => {
      let newInputField = inputFields.filter((obj) => obj.id !== index)
      setInputFields(newInputField);
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
        handleSubmit();
      } else {
        window.location.reload();
        setisInputError(false);
      }
      return data
    }

    async function handleClick(e, whatStatus) {
      e.preventDefault();

      const dueDate = addDaysToDate(clientDateRef.current.value, parseInt(clientPaymentTermsRef.current.value));

      const updatedData = {
        ...data,
        id: "NE1234", //to change by backend
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

    // input errors
    const [ errors, setErrors ] = useState({})

    function handleSubmit() {

      function validateEmail(email) {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return emailRegex.test(email);
      }
      const errorStreet1 = document.querySelectorAll('.' + styles.error)[0];
      const errorCity1 = document.querySelectorAll('.' + styles.error)[1];
      const errorPost1 = document.querySelectorAll('.' + styles.error)[2];
      const errorCountry1 = document.querySelectorAll('.' + styles.error)[3];

      const inputStreet1 = document.querySelectorAll('.' + styles.errorInput)[0];
      const inputCity1 = document.querySelectorAll('.' + styles.errorInput)[1];
      const inputPost1 = document.querySelectorAll('.' + styles.errorInput)[2];
      const inputCountry1 = document.querySelectorAll('.' + styles.errorInput)[3];

      const errorName = document.querySelectorAll('.' + styles.error)[4];
      const errorEmail = document.querySelectorAll('.' + styles.error)[5];
      const errorStreet2 = document.querySelectorAll('.' + styles.error)[6];
      const errorCity2 = document.querySelectorAll('.' + styles.error)[7];
      const errorPost2 = document.querySelectorAll('.' + styles.error)[8];
      const errorCountry2 = document.querySelectorAll('.' + styles.error)[9];
      const errorDescription = document.querySelectorAll('.' + styles.error)[10];

      const inputName = document.querySelectorAll('.' + styles.errorInput)[4]; 
      const inputEmail = document.querySelectorAll('.' + styles.errorInput)[5]; 
      const inputStreet2 = document.querySelectorAll('.' + styles.errorInput)[6];
      const inputCity2 = document.querySelectorAll('.' + styles.errorInput)[7];
      const inputPost2 = document.querySelectorAll('.' + styles.errorInput)[8];
      const inputCountry2 = document.querySelectorAll('.' + styles.errorInput)[9];
      const inputDescription = document.querySelectorAll('.' + styles.errorInput)[10];

      const errorDate = document.querySelectorAll('.' + styles.errorPickers)[0];
      const errorPaymentTerms = document.querySelectorAll('.' + styles.errorPickers)[1];

      const errorLabelStreet1 = document.querySelectorAll('.' + styles.errorLabel)[0];
      const errorLabelCity1 = document.querySelectorAll('.' + styles.errorLabel)[1];
      const errorLabelPost1 = document.querySelectorAll('.' + styles.errorLabel)[2];
      const errorLabelCountry1 = document.querySelectorAll('.' + styles.errorLabel)[3];
      const errorLabelName1 = document.querySelectorAll('.' + styles.errorLabel)[4];
      const errorLabelEmail1 = document.querySelectorAll('.' + styles.errorLabel)[5];
      const errorLabelStreet2 = document.querySelectorAll('.' + styles.errorLabel)[6];
      const errorLabelCity2 = document.querySelectorAll('.' + styles.errorLabel)[7];
      const errorLabelPost2 = document.querySelectorAll('.' + styles.errorLabel)[8];
      const errorLabelCountry2 = document.querySelectorAll('.' + styles.errorLabel)[9];
      const errorLabelDescription = document.querySelectorAll('.' + styles.errorLabel)[10];

      const itemsNameArray = [...document.querySelectorAll('.' + styles.itemNameError)];
      const itemsQuantityArray = [...document.querySelectorAll('.' + styles.itemQuantityError)];
      const itemsPriceArray = [...document.querySelectorAll('.' + styles.itemPriceError)];

    itemsNameArray.forEach((item)=>{
      if (!item.value) {
        item.classList.add(styles.show)
      } else {
        item.classList.remove(styles.show)
      }
    })

    itemsQuantityArray.forEach((item)=>{
      if ((!item.value) || (item.value == 0)) {
        item.classList.add(styles.show)
      } else {
        item.classList.remove(styles.show)
      }
    })

    itemsPriceArray.forEach((item)=>{
      if ((!item.value) || (item.value == 0)) {
        item.classList.add(styles.show)
      } else {
        item.classList.remove(styles.show)
        console.log(item.value)
      }
    })

      let errors = {}

      if (!sellerAddressRef.current.value.trim()) {
        errors.sellerAddress = "can't be blank";
        errorStreet1.classList.remove('hide')
        inputStreet1.classList.add(styles.show)
        errorLabelStreet1.classList.add(styles.show)
      }
      
      if (!sellerCityRef.current.value.trim()) {
        errors.sellerCity = "can't be blank";
        errorCity1.classList.remove('hide');
        inputCity1.classList.add(styles.show)
        errorLabelCity1.classList.add(styles.show)
      }

      if (!sellerPostCodeRef.current.value.trim()) {
        errors.sellerPostCode = "can't be blank";
        errorPost1.classList.remove('hide');
        inputPost1.classList.add(styles.show)
        errorLabelPost1.classList.add(styles.show)
      }

      if (!sellerCountryRef.current.value.trim()) {
        errors.sellerCountry = "can't be blank";
        errorCountry1.classList.remove('hide');
        inputCountry1.classList.add(styles.show)
        errorLabelCountry1.classList.add(styles.show)
      }

      if (!clientNameRef.current.value.trim()) {
        errors.clientName = "can't be blank";
        errorName.classList.remove('hide');
        inputName.classList.add(styles.show);
        errorLabelName1.classList.add(styles.show)
      }

      if (!clientEmailRef.current.value.trim()) {
        errors.clientEmail = "can't be blank";
        errorEmail.classList.remove('hide');
        inputEmail.classList.add(styles.show);
        errorLabelEmail1.classList.add(styles.show)
      } else if (!validateEmail(clientEmailRef.current.value)) {
        errors.clientEmail = "invalid format";
        errorEmail.classList.remove('hide');
        inputEmail.classList.add(styles.show);
        errorLabelEmail1.classList.add(styles.show)
      }

      if (!clientAddressRef.current.value.trim()) {
        errors.clientAddress = "can't be blank";
        errorStreet2.classList.remove('hide')
        inputStreet2.classList.add(styles.show)
        errorLabelStreet2.classList.add(styles.show)
      }
      
      if (!clientCityRef.current.value.trim()) {
        errors.clientCity = "can't be blank";
        errorCity2.classList.remove('hide');
        inputCity2.classList.add(styles.show)
        errorLabelCity2.classList.add(styles.show)
      }

      if (!clientPostCodeRef.current.value.trim()) {
        errors.clientPostCode = "can't be blank";
        errorPost2.classList.remove('hide');
        inputPost2.classList.add(styles.show)
        errorLabelPost2.classList.add(styles.show)
      }

      if (!clientCountryRef.current.value.trim()) {
        errors.clientCountry = "can't be blank";
        errorCountry2.classList.remove('hide');
        inputCountry2.classList.add(styles.show)
        errorLabelCountry2.classList.add(styles.show)
      }

      if (!clientDateRef.current.value.trim()) {
        // errors.clientDate = "can't be blank";
        errorDate.classList.add(styles.show)
      }

      if (!clientPaymentTermsRef.current.value.trim()) {
        // errors.clientDate = "can't be blank";
        errorPaymentTerms.classList.add(styles.show)
      }
      
      if (!clientDescriptionRef.current.value.trim()) {
        errors.description = "can't be blank";
        errorDescription.classList.remove('hide');
        inputDescription.classList.add(styles.show);
        errorLabelDescription.classList.add(styles.show)
      }

      if (Object.keys(errors).length > 0) {
          setErrors(errors);
      }

  }
    
  return (

      <form className={(props.show) ? `${styles.form} ${styles.show} ${props.theme}` : `${styles.form} ${props.theme}`}>
      
        <div className="ff-sanserif">
          <h1 className={`${styles.header} fs-M ${props.theme}`}>New Invoice</h1>

          <h2 className={`${styles.title} fs-S`}>Bill Form</h2>

          <div className={`${styles.section}`}>
            <div className={`${styles.child}`}>
              <label className={`fs-body ${props.theme} ${styles.errorLabel}`} htmlFor="address">Street Address</label>
              <input className={`${props.theme} fs-S2 ${styles.errorInput}`} type="text" ref={sellerAddressRef}/>
              <span className={`${styles.error} ff-sanserif hide`}>{errors.sellerAddress}</span>
            </div>

            <div className={`${styles.parent}`}>
              <div className={`${styles.child} ${styles.small}`}>
                <label className={`fs-body ${props.theme} ${styles.errorLabel}`} htmlFor="city">City</label>
                <input className={`${props.theme} fs-S2 ${styles.errorInput}`} type="text" ref={sellerCityRef} />
                <span className={`${styles.error} ff-sanserif hide`}>{errors.sellerCity}</span>
              </div>

              <div className={`${styles.child} ${styles.small}`}>
                <label className={`fs-body ${props.theme} ${styles.errorLabel}`} htmlFor="postcode">Post Code</label>
                <input className={`${props.theme} fs-S2 ${styles.errorInput}`} type="text" ref={sellerPostCodeRef} />
                <span className={`${styles.error} ff-sanserif hide`}>{errors.sellerPostCode}</span>
              </div>

              <div className={`${styles.child} ${styles.small}`}>
                <label className={`fs-body ${props.theme} ${styles.errorLabel}`} htmlFor="country">Country</label>
                <input className={`${props.theme} fs-S2 ${styles.errorInput}`} type="text" ref={sellerCountryRef} />
                <span className={`${styles.error} ff-sanserif hide`}>{errors.sellerCountry}</span>
              </div>
            </div>
          </div>

          <h2 className={`${styles.title} fs-S`}>Bill To</h2>

          <div className={`${styles.section}`}>
            <div className={`${styles.child}`}>
              <label className={`fs-body ${props.theme} ${styles.errorLabel}`} htmlFor="name">Client's Name</label>
              <input className={`${props.theme} fs-S2 ${styles.errorInput}`} id="name" type="text" ref={clientNameRef}/>
              <span className={`${styles.error} ff-sanserif hide`}>{errors.clientName}</span>
            </div>

            <div className={`${styles.child}`}>
              <label className={`fs-body ${props.theme} ${styles.errorLabel}`} htmlFor="email">Client's Email</label>
              <input className={`${props.theme} fs-S2 ${styles.errorInput}`} id="email" type="text" ref={clientEmailRef}/>
              <span className={`${styles.error} ff-sanserif hide`}>{errors.clientEmail}</span>
            </div>

            <div className={`${styles.child}`}>
              <label className={`fs-body ${props.theme} ${styles.errorLabel}`} htmlFor="clientAddress">Client's Address</label>
              <input className={`${props.theme} fs-S2 ${styles.errorInput}`} id="clientAddress" type="text" ref={clientAddressRef}/>
              <span className={`${styles.error} ff-sanserif hide`}>{errors.clientAddress}</span>
            </div>

            <div className={`${styles.parent}`}>
              <div className={`${styles.child} ${styles.small}`}>
                <label className={`fs-body ${props.theme} ${styles.errorLabel}`} htmlFor="clientCity">City</label>
                <input className={`${props.theme} fs-S2 ${styles.errorInput}`} id="clientCity" type="text" ref={clientCityRef}/>
                <span className={`${styles.error} ff-sanserif hide`}>{errors.clientCity}</span>
              </div>
              <div className={`${styles.child} ${styles.small}`}>
                <label className={`fs-body ${props.theme} ${styles.errorLabel}`} htmlFor="clientPostCode">Post Code</label>
                <input className={`${props.theme} fs-S2 ${styles.errorInput}`} id="clientPostCode" type="text" ref={clientPostCodeRef}/>
                <span className={`${styles.error} ff-sanserif hide`}>{errors.clientPostCode}</span>
              </div>
              <div className={`${styles.child} ${styles.small}`}>
                <label className={`fs-body ${props.theme} ${styles.errorLabel}`} htmlFor="clientCountry">Country</label>
                <input className={`${props.theme} fs-S2 ${styles.errorInput}`} id="clientCountry" type="text" ref={clientCountryRef}/>
                <span className={`${styles.error} ff-sanserif hide`}>{errors.clientCountry}</span>
              </div>
            </div>

      

            <div className={`${styles.parent} ${styles.parentPickers} ${styles.errorPickers}`}>
                <DatePicker 
                ref={clientDateRef}
                />
                <PaymentTerms
                  ref={clientPaymentTermsRef}
                />
            </div>
            <div className={`${styles.child}`}>
              <label className={`fs-body ${props.theme} ${styles.errorLabel}`} htmlFor="description">Project Description</label>
              <input className={`${props.theme} fs-S2 ${styles.errorInput}`} id="desciption" type="text" ref={clientDescriptionRef}/>
              <span className={`${styles.error} ff-sanserif hide`}>{errors.description}</span>
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
              
              
              {inputFields.map((item, index) => (
                <Fragment key={index}>
                <input className={`${styles.itemListInput} ${props.theme} fs-S2 ${styles.itemNameError}`} type="text" id={`itemName_${item.id}`} value={item.itemName} onChange={(e) => handleChange(item.id, 'itemName', e.target.value)} key={item.id}/>
                <input className={`${styles.noArrow} ${props.theme} fs-S2 ${styles.number} ${styles.noPadding} ${styles.itemQuantityError}`} type="number" id={`quantity_${item.id}`} value={item.quantity} onChange={(e) => handleChange(item.id, 'quantity', e.target.value)}/>
                <input className={`${styles.noArrow} ${props.theme} fs-S2 ${styles.number} ${styles.noPadding} ${styles.itemPriceError}`} type="number" id={`price_${item.id}`} value={item.price} onChange={(e) => handleChange(item.id, 'price', e.target.value)}/>
                <div className={`ff-sanserif ${styles.total} ${styles.center}`}>{(item.price * item.quantity).toFixed(2)}</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none" onClick={(e) => handleDeleteInputField(e, item.id)} className={`${styles.delete}`}>
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
