import { useState } from "react";
import Invoice from "./Invoice";

export default function Invoices({ invoices, setInvoice }) {
    // Add error handling
    const [error, setError] = useState(null);
    const invoiceList = invoices;

    return (
        <main className="w-4/5 flex flex-col">
            <nav className="text-white flex justify-between">
                <div>
                    <h1 className="font-extrabold text-2xl">Invoices</h1>
                    <p>
                        There are{" "}
                        {invoiceList ? "no" : `${invoiceList.length} total`}{" "}
                        invoices{" "}
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
                    <button className="text-white bg-purple-600 rounded-3xl p-5 text-xl">
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
