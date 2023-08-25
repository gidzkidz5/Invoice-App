import DetailedInvoice from "@/components/invoices/DetailedInvoice";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { capitalizeFirstLetter } from "@/helpers/others-util";
import EditInvoice from "@/components/form/EditInvoice";
import ConfirmDelete from "@/components/layout/ConfirmDelete";
import connectDatabase from "@/helpers/db-util";
import Link from "next/link";
import { ThemeContext } from "@/ThemeContext";

export default function DetailedInvoicePage(props) {
  const router = useRouter();

  const [loadedInvoice, setLoadedInvoice] = useState(props.data);
  const [isBlank, setIsBlank] = useState(false);
  const [showForm, setShowForm] = useState(false)
  const [showDelete, setShowDelete] = useState(false);
  const {theme} = useContext(ThemeContext)
  
  function showInvoice(e) {
    e.preventDefault();
    setShowForm(!showForm)
  }

  async function deleteInvoice(e) {
    e.preventDefault();
    showDeleteBg(e)
    const response = await fetch(`../api/invoices/${router.query.id}/editInvoice`,
      {
        method: 'DELETE',
        body: JSON.stringify(router.query.id),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

    const data = await response.json();

    if (!response.ok) {
      console.log("did not delete")
    } else {
      window.location.reload();
    }
  }

  function showDeleteBg(e) {
    e.preventDefault();
    setShowDelete(!showDelete)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/invoices/${router.query.id}`);

        if (response.status === 404) {
          //no invoices found
          setLoadedInvoice(null);
          setIsBlank(true);
        } else {
          const data = await response.json();
          console.log(data, "data");
          setLoadedInvoice(data.result);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (router.query.id) {
      fetchData();
    }
  }, [router.query.id]);

  if (!loadedInvoice && !isBlank) {
    return <p>Loading...</p>;
  }

  if (isBlank) {
    return <p>Invoice cannot be found</p>;
  }

  return (
    <>
    <DetailedInvoice
      status={capitalizeFirstLetter(loadedInvoice.status)}
      id={loadedInvoice.id}
      description={loadedInvoice.description}
      senderStreet={loadedInvoice.senderAddress.street}
      senderCity={loadedInvoice.senderAddress.city}
      senderPostCode={loadedInvoice.senderAddress.postCode}
      senderCountry={loadedInvoice.senderAddress.country}
      createdDate={loadedInvoice.createAt || loadedInvoice.createdAt}
      dueDate={loadedInvoice.paymentDue}
      clientName={loadedInvoice.clientName}
      clientStreet={loadedInvoice.clientAddress.street}
      clientCity={loadedInvoice.clientAddress.city}
      clientPostCode={loadedInvoice.clientAddress.postCode}
      clientCountry={loadedInvoice.clientAddress.country}
      email={loadedInvoice.clientEmail}
      items={loadedInvoice.items}
      total={loadedInvoice.total.toFixed(2)}

      editOnClick={showInvoice}
      deleteClick={showDeleteBg}
    />

    <EditInvoice
        show={showForm}
        loadedData={loadedInvoice}
        onClick={showInvoice}
    />
    {showForm && <div className="darkenBg2"></div>}
    {(showDelete) && <div className="darkenBg">
      <ConfirmDelete
          deleteClick={deleteInvoice}
          cancelClick={showDeleteBg}
      />
    </div>}
    </>
  );
}

export async function getServerSideProps(context) {
  const invoiceId = context.params.id;

  const client = await connectDatabase();

  const db = client.db();

  const result = await db.collection("Invoices").findOne({ id: invoiceId });

  const data = JSON.parse(JSON.stringify(result))
  

  return {
    props: {
      data: data
    }
  }

  

  
}
// if (req.method === "GET") {
//   const result = await db.collection("Invoices").findOne({ id: invoiceId });

//   //   console.log(result)
//   if(!result) {
//       return res.status(404).json({error: "No invoices found"})
//   } 
//   res.status(200).json({ result });
// }