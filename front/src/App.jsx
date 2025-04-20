import Invoices from './Invoices'
import InvoiceForm from './InvoiceForm'
import { useEffect, useState } from "react"
import { Route, Routes } from 'react-router'
import axios from "axios";

function App() {
    // TODO scramble id up as it's used for paths
    const [invoices, setInvoices] = useState(null);
    const [invoice, setInvoice] = useState(null);
    const [isReqOk, setIsReqOk] = useState(false);

    useEffect(() => {
        const getInvoices = async() => {
            const invoices = await axios.get(import.meta.env.VITE_API_URL);
            setInvoices(invoices.data.invoices);
        }
        getInvoices();
    }, [isReqOk])

    const handleSuccessfulRequest = () => setIsReqOk(prev => !prev);

    // Simple check if its correct
    // useEffect(() => {
      /*
        If there is no invoice, add error, dont navigate. maybbe do from controller, where i check id before redirectin
        Better idea to make new page for errors 
      */

    // }, [invoice]);

  return (
  <> 
    {invoices &&
      <Routes>
        <Route index element={<Invoices invoices={invoices} setInvoice={setInvoice}/>}/>
        <Route path="/invoice" >
            <Route index element={<InvoiceForm invoice={invoice} submitCompleted={handleSuccessfulRequest}/>}  />
            <Route path="add" element={<InvoiceForm invoice={null} submitCompleted={handleSuccessfulRequest}/>} />
        </Route>
      </Routes>
    } 
  </>)
}

export default App
