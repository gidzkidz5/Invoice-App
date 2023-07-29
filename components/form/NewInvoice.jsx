import AddNewItem from "../buttons/AddNewItem";
import Discard from "../buttons/Discard";
import { SaveDraftButton, SaveSendButton } from "../buttons/Save";
import DatePicker from "../inputs/DatePicker";
import PaymentTerms from "../inputs/PaymentTerms";
import styles from "./NewInvoice.module.css";

export default function NewInvoice(props) {
    function handleClick(e) {
        e.preventDefault()
    }
    
  return (

      <form className={(props.show) ? `${styles.form} ${styles.show}` : `${styles.form}`}>
      
        <div className="ff-sanserif">
          <h1 className={`${styles.header} fs-M`}>New Invoice</h1>

          <h2 className={`${styles.title} fs-S`}>Bill Form</h2>

          <div className={`${styles.section}`}>
            <div className={`${styles.child}`}>
              <label className="fs-body" htmlFor="address">Street Address</label>
              <input className="light fs-S2" type="text" />
            </div>

            <div className={`${styles.parent}`}>
              <div className={`${styles.child}`}>
                <label className="fs-body" htmlFor="city">City</label>
                <input className="light fs-S2" type="text" />
              </div>

              <div className={`${styles.child}`}>
                <label className="fs-body" htmlFor="postcode">Post Code</label>
                <input className="light fs-S2" type="text" />
              </div>

              <div className={`${styles.child}`}>
                <label className="fs-body" htmlFor="country">Country</label>
                <input className="light fs-S2" type="text" />
              </div>
            </div>
          </div>

          <h2 className={`${styles.title} fs-S`}>Bill To</h2>

          <div className={`${styles.section}`}>
            <div className={`${styles.child}`}>
              <label className="fs-body" htmlFor="name">Client's Name</label>
              <input className="light fs-S2" id="name" type="text" />
            </div>

            <div className={`${styles.child}`}>
              <label className="fs-body" htmlFor="email">Client's Email</label>
              <input className="light fs-S2" id="email" type="text" />
            </div>

            <div className={`${styles.child}`}>
              <label className="fs-body" htmlFor="clientAddress">Client's Address</label>
              <input className="light fs-S2" id="clientAddress" type="text" />
            </div>

            <div className={`${styles.parent}`}>
              <div className={`${styles.child}`}>
                <label className="fs-body" htmlFor="clientCity">City</label>
                <input className="light fs-S2" id="clientCity" type="text" />
              </div>
              <div className={`${styles.child}`}>
                <label className="fs-body" htmlFor="clientPostCode">Post Code</label>
                <input className="light fs-S2" id="clientPostCode" type="text" />
              </div>
              <div className={`${styles.child}`}>
                <label className="fs-body" htmlFor="clientCountry">Country</label>
                <input className="light fs-S2" id="clientCountry" type="text" />
              </div>
            </div>

      

            <div className={`${styles.parent}`}>
              <DatePicker />
              <PaymentTerms />
            </div>
            <div className={`${styles.child}`}>
              <label className="fs-body" htmlFor="description">Project Description</label>
              <input className="light fs-S2" id="desciption" type="text" />
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
              <SaveDraftButton/>
              <SaveSendButton />
          </div>
        </div>
      
    
      
      </form>
  
    
  );
}
