import { formatDate } from "@/helpers/others-util";
import Delete from "../buttons/Delete";
import Edit from "../buttons/Edit";
import MarkPaid from "../buttons/MarkPaid";
import styles from "./DetailedInvoice.module.css";
import InvoiceStatus from "./InvoiceStatus";
import { Fragment, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ThemeContext } from "@/ThemeContext";
import Link from "next/link";
import next from "next";

export default function DetailedInvoice(props) {
  //Theme
  const { theme } = useContext(ThemeContext);

  const router = useRouter();
  const path = router.query.id;
  
  console.log(props.status.toLowerCase(), "1st");
  const [wantedStatus, setWantedStatus] = useState(props.status.toLowerCase());

  function changeStatus() {
    if (wantedStatus.toLowerCase() === "paid") {
      setWantedStatus("pending");
    } else {
      setWantedStatus("paid");
    }
  }

  function handleClick() {
    changeStatus()    
    console.log(wantedStatus, "wantedStatus");

    // router.push(`/invoices/${path}`)

    return;
  }

  

  useEffect(() => {
    if (wantedStatus !== props.status.toLowerCase()) {
      fetch(`/api/invoices/${path}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wantedStatus),
      },{cache: 'no-cache'})
        .then((response) => response.json())
        .then((data) => {
          console.log("inside fetch");
          console.log(data); //Updated resource response
          // router.reload(path)
          window.location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [wantedStatus, path, props.status]);

  // screen width
  const [screenWidth, setScreenWidth] = useState();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let screenSize = "";

  // Determine the src value based on the screen width

  if (screenWidth < 561) {
    // Mobile
    screenSize = "mobile";
  } else if (screenWidth >= 561 && screenWidth < 1024) {
    // Tablet
    screenSize = "tablet";
  } else {
    // Desktop
    screenSize = "desktop";
  }
  

  return (
    <>
    
      <div className={`${styles.main} ff-sanserif`}>
      <Link className={`backLink ff-sanserif fs-S2 ${theme}`} href={"../invoices"}>
      <div>
        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" strokeWidth="2" fill="none" fillRule="evenodd"/>
        </svg>
      </div>
      <span>Go Back</span>
    </Link>
        <section className={`${styles.header} ${theme}`}>
          <div className={`${styles.statusContainer}`}>
            <p className={`fs-body ${styles.grey} ${theme}`}>Status</p>
            <InvoiceStatus status={props?.status} />
          </div>
          <div className={`${styles.btnContainer}`}>
            <Edit onClick={props.editOnClick} />
            <Delete deleteClick={props.deleteClick} />
            <MarkPaid status={props.status} onClick={handleClick} />
          </div>
        </section>
        <section className={`${styles.detailsParent} ${theme} ff-sanserif`}>
          <div className={`${styles.detailsTitle}`}>
            <div className={`${styles.titleId}`}>
              <h1 className={`fs-S ${styles.black} ${theme}`}>
                <span className={`${styles.grey} ${theme}`}>#</span>
                {props.id}
              </h1>
              <p className={`${styles.grey} ${theme} fs-body`}>{props.description}</p>
            </div>
            <div className={`${styles.titleAddress} ${styles.grey} ${theme} fs-body`}>
              <p>{props.senderStreet}</p>
              <p>{props.senderCity}</p>
              <p>{props.senderPostCode}</p>
              <p>{props.senderCountry}</p>
            </div>
          </div>
          <div className={`${styles.detailsContent}`}>
            <div className={`${styles.content1}`}>
              <div className={`${styles.content1Child}`}>
                <h1 className={`fs-body ${styles.grey} ${theme}`}>Invoice Date</h1>
                <h2 className={`fs-S ${styles.black} ${theme}`}>
                  {formatDate(props.createdDate)}
                </h2>
              </div>
              <div className={`${styles.content1Child}`}>
                <h1 className={`fs-body ${styles.grey} ${theme}`}>Payment Due</h1>
                <h2 className={`fs-S ${styles.black} ${theme}`}>
                  {formatDate(props.dueDate)}
                </h2>
              </div>
            </div>
            <div className={`${styles.content2}`}>
              <h1 className={`fs-body ${styles.grey} ${theme}`}>Bill To</h1>
              <div>
                <h2 className={`fs-S ${styles.black} ${theme}`}>{props.clientName}</h2>
                <div className={`${styles.grey} ${theme} fs-body`}>
                  <p>{props.clientStreet}</p>
                  <p>{props.clientCity}</p>
                  <p>{props.clientPostCode}</p>
                  <p>{props.clientCountry}</p>
                </div>
              </div>
            </div>
            <div className={`${styles.content3}`}>
              <h1 className={`fs-body ${styles.grey} ${theme}`}>Sent to</h1>
              <h2 className={`fs-S ${styles.black} ${theme}`}>{props.email}</h2>
            </div>
          </div>
          <div className={`${styles.detailsCharges} ${theme}`}>
            <div className={`${styles.chargesTop}`}>
              <p className={`${styles.grey} ${theme} ${styles.column1} fs-body`}>
                Item Name
              </p>
              <p className={`${styles.grey} ${theme} ${styles.column2} fs-body`}>QTY.</p>
              <p className={`${styles.grey} ${theme} ${styles.column3} fs-body`}>
                Price
              </p>
              <p className={`${styles.grey} ${theme} ${styles.column4} fs-body`}>
                Total
              </p>

              {/* to be mapped */}
              {screenSize === "mobile"
                ? props.items.map((item, index) => (
                    <div
                      key={index}
                      className={`${styles.mobileItemContainer}`}
                    >
                      <div className={`${styles.mobileItem}`}>
                        <h2 className={`fs-S ${styles.black} ${theme}`}>{item.name}</h2>
                        <h2 className={`fs-S ${styles.grey} ${theme}`}>
                          {item.quantity} x $ {item.price.toFixed(2)}
                        </h2>
                      </div>
                      <div className={`${styles.mobilePrice}`}>
                        <h2 className={`fs-S ${styles.black}`}>
                          $ {item.total.toFixed(2)}
                        </h2>
                      </div>
                    </div>
                  ))
                : props.items.map((item, index) => (
                    <Fragment key={index}>
                      <h2 className={`fs-S ${styles.black} ${theme} ${styles.column1}`}>
                        {item.name}
                      </h2>
                      <h2 className={`fs-S ${styles.grey}  ${theme} ${styles.column2}`}>
                        {item.quantity}
                      </h2>
                      <h2 className={`fs-S ${styles.grey} ${theme}`}>
                        $ {item.price.toFixed(2)}
                      </h2>
                      <h2 className={`fs-S ${styles.black} ${theme}`}>
                        $ {item.total.toFixed(2)}
                      </h2>
                    </Fragment>
                  ))}
            </div>
            <div className={`${styles.chargesBottom} ff-sanserif`}>
              <p className={`fs-body`}>
                {props.status.toLowerCase() === "paid"
                  ? "Grand Total"
                  : "Amount Due"}
              </p>
              <span className={`${styles.totalAmt}`}>$ {props.total}</span>
            </div>
          </div>
        </section>
      </div>
      {screenSize === "mobile" && (
        <div className={`${styles.btnContainerBottom}`}>
          <Edit onClick={props.editOnClick} />
          <Delete />
          <MarkPaid status={props.status} onClick={handleClick} />
        </div>
      )}
    </>
  );
}

