import { useState, useContext, use } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import Invoice from "./Invoice";

export default function Invoices({ invoices, setInvoice }) {
    // Add error handling
    const [error, setError] = useState(null);
    const invoiceList = invoices;
    const {user, setUser} = useContext(UserContext);

    const nav = useNavigate();

    const apiInvoiceUrl = import.meta.env.VITE_API_URL;

    const handleNewInvoiceClick = () => {
        try {
            nav("/invoice/add");
        } catch (error) {
            setError(error);
        }
    };

    const handleUserLogin = () => {
        try {
            nav("/auth/login");
        } catch (error) {
            setError(error);
        }
    };

    const handleUserRegister = () => {
        try {
            nav("/auth/register");
        } catch (error) {
            setError(error);
        }
    };

    return (
        <main className="w-4/5 flex flex-col gap-5">
            <div className="flex">
                {
                    !user && (
                        <>
                            <button className="btn btn-auth "
                            onClick={handleUserLogin} 
                            >
                                Login
                            </button>
                            <button className="btn btn-auth"
                                onClick={handleUserRegister} 
                            >
                                Register
                            </button>
                        </>
                    )
                }
                {
                    user && (
                        <div className="flex gap-5">
                            <p className="text-white">Welcome {user.username}</p>
                            <button className="btn btn-auth"
                                onClick={() => {
                                    setUser(null);
                                    nav("/");
                                }} 
                            >
                                Logout
                            </button>
                        </div>
                    )
                }
            </div>
            <nav className="text-white flex justify-between py-5">
                <div>
                    <h1 className="font-extrabold text-2xl">Invoices</h1>
                    <p>
                        There are
                        {` ${invoiceList.length} total`} invoices
                    </p>
                </div>
                <div className="flex items-center">
                    <div>
                        Filter by
                        <select>
                            <option value="status">status</option>
                            <option value="status">draft</option>
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
                {invoiceList &&
                    invoiceList.map((i, { idx }) => (
                        <Invoice
                            invoice={i}
                            key={idx}
                            setInvoice={setInvoice}
                        />
                    ))}
            </div>
        </main>
    );
}
