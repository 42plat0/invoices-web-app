import StatusBadge from "./StatusBadge";
import "./static/Invoice.css";
import { useNavigate } from 'react-router';
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { InvoiceContext } from "./contexts/InvoiceContext";

export default function Invoice({invoice, example=false}){

    const { user } = useContext(UserContext);
    const { selectedInvoice, setSelectedInvoice} = useContext(InvoiceContext);
    if (example){
        return( 
            <div className="invoice-header">
                <p className="invoice-header-item">Id</p>
                <p className="invoice-header-item">Due at</p>
                <p className="invoice-header-item">Client name</p>
                <p className="invoice-header-item">Amount</p>
                {user.role === "admin" && <p className="invoice-header-item">Owner</p>}
                <p className="invoice-header-item">Status</p>
            </div>
        )
    }

    const {id, due_at, client_name, amount, status, owner} = selectedInvoice || invoice;
    const nav = useNavigate();

    const handleBadgeClick = () => {
        if (id){
            setSelectedInvoice(invoice);
            nav(`/invoice`);
        }
        // TODO add err handling
    }

    return (
        <div key={id} className="invoice-card">
            <p className="w-1/5 text-gray-400 font-bold">#<span className="text-white uppercase">{id.slice(id.length - 6)}</span></p>
            <p className="w-1/5">{formatDueDate(due_at)}</p>
            <p className="w-1/5 capitalize">{client_name}</p>
            <p className="w-1/5 font-bold text-lg text-white">${amount}</p>
            {user.role === "admin" && <p className="w-1/5">{owner}</p>}
            {/* TODO add key */}
            <StatusBadge status={status} invoiceId={id}/>

            <button className="text-gray-400" onClick={handleBadgeClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
}

// TODO export to helper function 
function formatDueDate(isoDateString){
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = monthNames[date.getMonth()];

    return `Due ${day} ${month} ${date.getFullYear()}`;
}