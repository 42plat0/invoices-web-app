import { useState, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { useNavigate } from "react-router";
import Invoice from "./Invoice";
import axios from "axios";

export default function Invoices({ invoices, setInvoice }) {
    // Add error handling
    const [error, setError] = useState(null);
    const invoiceList = invoices;
    const { user, setUser, loading } = useContext(UserContext);

    const nav = useNavigate();

    const API_URL = import.meta.env.VITE_AUTH_API_URL;

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
            console.error(error);
            setError(error);
        }
    };

    return (
        !loading && (
            <main className="w-screen h-screen flex gap-10">
                <div className="flex flex-col gap-5 justify-end items-center border-e border-red-300">
                    <p className="text-white uppercase">{user.username}</p>
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
                                {invoiceList &&
                                    ` ${invoiceList.length} total`}{" "}
                                invoices
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
                        <Invoice example={true} />
                        {!loading &&
                            invoiceList &&
                            invoiceList.map((i, { idx }) => (
                                <Invoice
                                    invoice={i}
                                    key={idx}
                                    setInvoice={setInvoice}
                                />
                            ))}
                    </div>
                </div>
            </main>
        )
    );
}
