import { useState } from "react"
import Invoice from "./Invoice";

export default function Invoices({invoices, setInvoice}){

    // Add error handling 
    const [error, setError] = useState(null);
    const invoiceList = invoices;

    return(
        <>
            {
                invoiceList && invoiceList.map((i, {idx}) => 
                    <Invoice invoice={i} key={idx} setInvoice={setInvoice}/>
                )
            }
        </>
    )
}