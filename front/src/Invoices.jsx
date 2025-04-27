import { useState, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { useNavigate } from "react-router";
import Invoice from "./Invoice";
import axios from "axios";
import { InvoiceContext } from "./contexts/InvoiceContext";

export default function Invoices() {
    // Add error handling
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");
    const {invoices, loading:invLoading, setSelectedInvoice} = useContext(InvoiceContext);
    const { user, setUser, loading } = useContext(UserContext);

    const nav = useNavigate();

    const API_URL = import.meta.env.VITE_AUTH_API_URL;

    const handleNewInvoiceClick = () => {
        try {
            nav("/invoice/add");
        } catch (error) {
            setError(error.response.data.errors);
        }
    };

    // TODO probably needs to go elsewhere
    const handleUserLogout = async () => {
        try {
            // need to send something to the back
            const res = await axios.post(
                `${API_URL}/logout`,
                {},
                {
                    withCredentials: true,
                }
            );

            if (res.status === 200) {
                setUser(null);
                nav("/");
            }
        } catch (error) {
            setError(error.response.data.errors);
        }
    };

    // Filter invoices based on the selected status
    const filteredInvoices = invoices?.filter((invoice) =>{
        if (filterStatus === "all"){
            return invoice;
        }
        return  invoice.status === filterStatus.toLowerCase();
    }
    );

    return (
        !loading && !invLoading && (
            <main className="w-screen h-screen flex gap-10">
                {error && <p className="err">{error}</p>}
                <div className="flex flex-col gap-5 justify-end items-center border-e border-red-300 p-3">
                    <p className="text-white uppercase font-semibold">{user.username}</p>
                    <button
                        className="btn btn-auth"
                        onClick={handleUserLogout}
                    >
                        Logout
                    </button>
                </div>
                <div className="w-4/5">
                    <nav className="text-white flex justify-between py-5">
                        <div>
                            <h1 className="font-extrabold text-2xl">
                                Invoices
                            </h1>
                            <p>
                                There are
                                {invoices &&
                                    ` ${invoices.length} total`}{" "}
                                invoices
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className="px-3">
                                Filter by
                                <select
                                    onChange={(e) => {
                                        setFilterStatus(e.target.value)
                                    }} 
                                    className="ml-2 rounded bg-gray-800 p-2 text-white"
                                >
                                    <option value="all">All</option>
                                    <option value="draft">Draft</option>
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                </select>
                            </div>
                            {/* TODO change to module button downloaded from internet */}
                            <button
                                className="text-white bg-purple-600 rounded-3xl p-5 text-xl cursor-pointer"
                                onClick={handleNewInvoiceClick}
                            >
                                <span className="bg-white text-purple-600 px-3 py-1 text-2xl font-bold rounded-4xl cursor-pointer mr-3">
                                    +
                                </span>
                                New Invoice
                            </button>
                        </div>
                    </nav>
                    <div>
                        <Invoice example={true} />
                        {!loading && !invLoading &&
                            filteredInvoices &&
                            filteredInvoices.map((i, { idx }) => (
                                <Invoice
                                    invoice={i}
                                    key={idx}
                                />
                            ))}
                    </div>
                </div>
            </main>
        )
    );
}
