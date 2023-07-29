import { useState } from "react";
import styles from "./FilterStatus.module.css";
import { Checkbox } from "@mui/material";


export default function FilterStatus() {
  const [dropdown, setDropdown] = useState(false);

  function rotateArrow() {
    
    setDropdown(!dropdown);
    
   
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
        <div className={`${styles.input}`}>
          <Checkbox
            sx={{
              color: "#DFE3FA",
              "&.Mui-checked": {
                color: "#7C5DFA",
              },
            }}
          />
          <label>Draft</label>
        </div>

        <div className={`${styles.input}`}>
          <Checkbox
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
