import DetailedInvoice from "@/components/invoices/DetailedInvoice";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { capitalizeFirstLetter } from "@/helpers/others-util";
import EditInvoice from "@/components/form/EditInvoice";
import ConfirmDelete from "@/components/layout/ConfirmDelete";
import connectDatabase from "@/helpers/db-util";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";


export default function DetailedInvoicePage(props) {
  const router = useRouter();

  const [loadedInvoice, setLoadedInvoice] = useState(props.data);
  const [isBlank, setIsBlank] = useState(false);
  const [showForm, setShowForm] = useState(false)
  const [showDelete, setShowDelete] = useState(false);
 

  //session
 
  const { session, status } = useSession();
  const loading = status === "loading"

  
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
        const response = await fetch(`/api/invoices/${router.query.id}`, {cache: 'no-cache' });

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
    getSession()
        .then(session => {
          if (!session) {
            router.push('/')
          } else {
            if (router.query.id) {
              fetchData();
            }
          }
        })

    
  }, [router.query.id]);

  if ((!loadedInvoice && !isBlank) || (!session && status === 'loading')) {
    return <p>Loading...</p>;
  }

  if (isBlank) {
    return <p>Invoice cannot be found</p>;
  }

  if (!session && status === 'unauthenticated') {
    return <p>Not Authenticated</p>
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

// export async function getStaticPaths() {
//   const client = await connectDatabase();
//   const db = client.db();

//   const invoices = await db.collection("Invoices").find({}).toArray();

//   const paths = invoices.map((invoice) => ({
//     params: { id: invoice.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: false, // Or 'blocking' if you want to use ISR
//   };
// }

export async function getServerSideProps({ params }) {
  const invoiceId = params.id;

  const client = await connectDatabase();
  const db = client.db();

  const result = await db.collection("Invoices").findOne({ id: invoiceId });

  const data = JSON.parse(JSON.stringify(result));

  return {
    props: {
      data,
    },
  };
}


// export async function getServerSideProps(context) {
//   const invoiceId = context.params.id;

//   const client = await connectDatabase();

//   const db = client.db();

//   const result = await db.collection("Invoices").findOne({ id: invoiceId });

//   const data = JSON.parse(JSON.stringify(result))
  

//   return {
//     props: {
//       data: data
//     }
// }}

