import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {user} = useContext(UserContext)

    const API_URL = import.meta.env.VITE_API_URL;

    // Fetch invoices from the backend
    const fetchInvoices = async () => {
        const res = await axios.get(`${API_URL}`, { withCredentials: true });
        setInvoices(res.data.invoices);
        setLoading(false);
    };

    // Add a new invoice
    const addInvoice = async (invoiceData) => {
        const res = await axios.post(`${API_URL}`, invoiceData, { withCredentials: true });
        setInvoices((prev) => [...prev, res.data.invoice]); // Add the new invoice to the state
        setSelectedInvoice(null);
    };

    // Update an existing invoice
    const updateInvoice = async (id, updatedData) => {
        const res = await axios.put(`${API_URL}/${id}`, updatedData, { withCredentials: true });
        setInvoices((prev) =>
            prev.map((invoice) => (invoice.id === id ? res.data.invoice : invoice)))
        setSelectedInvoice(null);
    };

    // Delete an invoice
    const deleteInvoice = async (id) => {
        await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
        setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
        setSelectedInvoice(null);
    };

    // Fetch invoices on component mount
    useEffect(() => {
            fetchInvoices();
    }, []);

    return (
        <InvoiceContext.Provider
            value={{
                invoices,
                selectedInvoice,
                setSelectedInvoice,
                loading,
                error,
                fetchInvoices,
                addInvoice,
                updateInvoice,
                deleteInvoice,
            }}
        >
            {children}
        </InvoiceContext.Provider>
    );
};