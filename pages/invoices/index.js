import InvoicePageHeader from "@/components/invoices/InvoicePageHeader";
import InvoiceStatus from "@/components/invoices/InvoiceStatus";

export default function InvoicesPage() {

    return (
        <>
        <InvoicePageHeader/>
        <div>
            <InvoiceStatus
                status="Paid"
            />
        </div>
        </>
    )
}