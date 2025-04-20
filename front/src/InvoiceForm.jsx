import { useForm } from "react-hook-form";
import "./static/app.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function InvoiceForm({ invoice, submitCompleted }) {
    const { register, handleSubmit, setValue, reset } = useForm();
    const [error, setError] = useState(null);
    const nav = useNavigate();

    const apiInvoiceUrl = import.meta.env.VITE_API_URL;

    // const sendData = async(data) => {
    //     try {
    //         await axios.post(import.meta.env.VITE_API_URL, data);
    //         reset();
    //         nav("/ticket");

    //     } catch (error) {
    //         setError(error);
    //     }
    // }

    const sendForm = async (data) => {
        try {
            let res;

            if (invoice){
                res = await axios.put(apiInvoiceUrl + "/" + invoice.id, data);
            }else{
                res = await axios.post(apiInvoiceUrl, data);
            }

            if (res.status === 200){
                submitCompleted();
                goHomeHandler();
                
            }
        } catch (error) {
            setError(error);
        }
    };

    const deleteInvoice = async (data) => {
        try {
            const res = await axios.delete(apiInvoiceUrl + "/" + invoice.id);

            if (res.status === 200){
                submitCompleted();
                goHomeHandler();
            }
        } catch (error) {
            setError(error);
        }

    };

    const goHomeHandler = () => nav("/");

    if (invoice) {
        invoice.due_at = getDateStr(invoice.due_at);
        setValue("status", invoice.status);
    }

    return (
        <div className="flex flex-col w-fit justify-center bg-white text-center p-5">
            {error && <p>error</p>}
            <form
                className="flex flex-col text-2xl gap-3"
                onSubmit={handleSubmit(sendForm)}
                noValidate
            >
                <div className="flex flex-col">
                    <div className="flex py-2 justify-between">
                        <label
                            className="customInput-label"
                            htmlFor="client_name"
                        >
                            Client Name
                        </label>

                        <button
                            className="btn customBtn-exit customBtn-exit-sm"
                            onClick={goHomeHandler}
                        >
                            ✕
                        </button>
                    </div>

                    <input
                        type="text"
                        defaultValue={invoice ? invoice.client_name : "..."}
                        id="clientNameField"
                        disabled={invoice ? true : ""}
                        className="customInput"
                        {...register("client_name", {
                            required: "Client name is required",
                        })}
                    />
                </div>
                <div className="flex gap-3">
                    <div className="flex flex-col">
                        {/* Select */}
                        <label htmlFor="status" class="customInput-label">
                            Invoice Status
                        </label>
                        <select
                            id="status"
                            class="customInput customInput-select"
                            {...register("status", {
                                required: "Status is required",
                            })}
                        >
                            <option value="draft">Draft</option>
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="customInput-label" htmlFor="due_at">
                            Due at
                        </label>
                        <input
                            type="date"
                            value={invoice ? invoice.due_at : "2024-03-24"}
                            className="customInput"
                            {...register("due_at", {
                                required: "Due at is required",
                            })}
                        />
                    </div>
                </div>
                
                <div className="flex flex-col">
                    <label className="customInput-label" htmlFor="amount">
                        Amount
                    </label>
                    <input
                        type="number"
                        defaultValue={invoice ? invoice.amount : ""}
                        className="customInput"
                        {...register("amount", {
                            required: "Amount is required",
                        })}
                    />
                </div>
                <div className="flex justify-center gap-5">
                    <input
                        type="submit"
                        value={invoice ? "Update" : "Submit"}
                        className="btn btn-secondary"
                        onSubmit={sendForm}
                    />
                    <button
                        value="Delete"
                        className="btn btn-warning"
                        onClick={deleteInvoice}
                    >
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
}

// Inp: string
function getDateStr(dateTimestamp) {
    const date = new Date(dateTimestamp);

    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();

    return year + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0");
}
