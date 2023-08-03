import { createContext, useState } from 'react';
// import PropTypes from 'prop-types';

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [InvoiceData, setInvoiceData] = useState({filterStatus: {
    draft: false,
    pending: false,
    paid: false
  }});

//   const updateFormData = (newData) => {
//     setFormData((prevData) => ({ ...prevData, ...newData }));
//   };
    const updateInvoiceData = (newData) => {
        setInvoiceData((prevData) => ({ ...prevData, ...newData}))
    }

  return (
    <InvoiceContext.Provider value={{ InvoiceData, updateInvoiceData, setInvoiceData }}>
      {children}
    </InvoiceContext.Provider>
  );
};

// FormProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };


