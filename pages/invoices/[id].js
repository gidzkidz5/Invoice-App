import DetailedInvoice from "@/components/invoices/DetailedInvoice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "@/helpers/others-util";
import EditInvoice from "@/components/form/EditInvoice";
export default function DetailedInvoicePage() {
  const router = useRouter();

  const [loadedInvoice, setLoadedInvoice] = useState();
  const [isBlank, setIsBlank] = useState(false);
  const [showForm, setShowForm] = useState(false)
  
  function showInvoice(e) {
    e.preventDefault();
    setShowForm(!showForm)
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
      createdDate={loadedInvoice.createdAt}
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
    />

    <EditInvoice
        show={showForm}
        loadedData={loadedInvoice}
        onClick={showInvoice}
    />
    </>
  );
}
