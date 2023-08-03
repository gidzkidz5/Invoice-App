import { useContext, useRef, useState } from "react";
import styles from "./FilterStatus.module.css";
import { Checkbox } from "@mui/material";
import { InvoiceContext } from "@/InvoiceContext";


export default function FilterStatus(props) {
  const [dropdown, setDropdown] = useState(false);
  const [checked, setChecked] = useState([false, false ,false])
  const {InvoiceData, updateInvoiceData, setInvoiceData} = useContext(InvoiceContext);
  


  function rotateArrow() {
    setDropdown(!dropdown);
  }

  function handleCheckboxChange(index) {
    console.log(index)
    let statusChecked;
    if (index === 0) {
      statusChecked = "draft"
    } else if (index === 1) {
      statusChecked = "pending"
    } else {
      statusChecked = "paid"
    }

    setInvoiceData((prevValue) => ({
      filterStatus: {
        ...prevValue.filterStatus,
        [statusChecked]: !prevValue.filterStatus[statusChecked]
      }
    }))

    console.log(InvoiceData)
    setChecked(
      checked.map((isChecked, i) => (i === index ? !isChecked : isChecked))
    )
    props.onCheckboxChange(index)
  }

  return (
    <div className={`${styles.parent}`}>
      <div
        className={`${styles.main} ff-sanserif fs-S2 flex`}
        onClick={rotateArrow}
      >
        <span className={`${styles.text}`}>Filter by status</span>
        <svg
          className={dropdown ? `${styles.arrow}` : `${styles.arrowDefault}`}
          width="11"
          height="7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1l4.228 4.228L9.456 1"
            stroke="#7C5DFA"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </div>
      <div className={`${styles.dropdownParent}`}>
     <div className={dropdown ? `${styles.dropdown} ff-sanserif fs-S2` : `${styles.dropdownClose} ff-sanserif fs-S2`}>
        <div className={`${styles.input}`} >
          <Checkbox
            key="1"
            // checked={checkedboxRef.current[1] || false}
            // onChange={()=> (handleCheckboxChange(1))}
            checked={checked[0]}
            onChange={() => handleCheckboxChange(0)}
            sx={{
              color: "#DFE3FA",
              "&.Mui-checked": {
                color: "#7C5DFA",
              },
            }}
          />
          <label>Draft</label>
        </div>

        <div className={`${styles.input}`} >
          <Checkbox
            key="2"
            // checked={checkedboxRef.current[2] || false}
            checked={checked[1]}
            onChange={()=> (handleCheckboxChange(1))}
            sx={{
              color: "#DFE3FA",
              "&.Mui-checked": {
                color: "#7C5DFA",
              },
            }}
          />
          <label>Pending</label>
        </div>

        <div className={`${styles.input}`}>
          <Checkbox
            key="3"
            // checked={checkedboxRef.current[3] || false}
            checked={checked[2]}
            onChange={()=> (handleCheckboxChange(2))}
            sx={{
              color: "#DFE3FA",
              "&.Mui-checked": {
                color: "#7C5DFA",
              },
            }}
          />
          <label>Paid</label>
        </div>
      </div> 
     
      </div>
    </div>
  );
}
