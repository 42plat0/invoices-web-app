import { useForm } from "react-hook-form";
import "./static/app.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";
import UserSelector from "./UserSelector";
import { UserContext } from "./contexts/UserContext";
import { InvoiceContext } from "./contexts/InvoiceContext";

export default function InvoiceForm({ submitCompleted }) {
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const {user} = useContext(UserContext);
    const {addInvoice, deleteInvoice:delInv, updateInvoice, selectedInvoice, setSelectedInvoice, fetchInvoices} = useContext(InvoiceContext);
    const invoice = selectedInvoice;
    const nav = useNavigate();

    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            due_at: invoice?.due_at ? getDateStr(invoice.due_at) : "",
        },
    });

    const sendForm = async (data) => {
        try {
            setError(null);
            invoice ? await updateInvoice(invoice.id, data) : await addInvoice(data);
            submitCompleted();
            await fetchInvoices();
            reset();
            goHomeHandler();
        } catch (error) {
            setError(error.response.data.errors);
        }
    };

    const deleteInvoice = async (data) => {
        try {
            await delInv(invoice.id)
            submitCompleted();
            reset();
            goHomeHandler();
        } catch (error) {
            setError(error.response.data.errors);
        }
    };

    const goHomeHandler = () => {setSelectedInvoice(null); nav("/")};

    if (!user) {nav("/"); return null};

    return (
        <div className="flex flex-col w-fit bg-white text-center p-5 relative">
            {error && <p className="err">{error}</p>}
            <button
                className="btn customBtn-exit customBtn-exit-sm absolute right-5"
                onClick={goHomeHandler}
            >
                ✕
            </button>
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
                    </div>

                    <input
                        type="text"
                        defaultValue={invoice ? invoice.client_name : ""}
                        placeholder="..."
                        id="clientNameField"
                        disabled={invoice && user.role !== "admin" ? true : ""}
                        className="customInput"
                        {...register("client_name", {
                            required: "Client name is required",
                        })}
                    />
                    {errors.client_name && (
                        <p className="err">{errors.client_name.message}</p>
                    )}
                </div>
                {user.role === "admin" && 
                    <div className="flex flex-col">
                        <UserSelector onSelectUser={setUserId} defaultValue={invoice ? invoice.user_id : ""} register={
                            {...register("user_id", {
                                required: "User is required",
                            })}
                         }/>
                        {errors.user_id && (
                            <p className="err">{errors.user_id.message}</p>
                        )}
    
                    </div>

                }

                <div className="flex gap-3">
                    <div className="flex flex-col">
                        {/* Select */}
                        <label htmlFor="status" className="customInput-label">
                            Invoice Status
                        </label>
                        <select
                            id="status"
                            className="customInput customInput-select"
                            defaultValue={invoice ? invoice.status : "Draft"}
                            {...register("status", {
                                required: "Status is required",
                            })}
                        >
                            <option value="draft">Draft</option>
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                        </select>
                        {errors.status && (
                            <p className="err">{errors.status.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label className="customInput-label" htmlFor="due_at">
                            Due at
                        </label>
                        <input
                            type="date"
                            min="1990-01-01"
                            max="2099-12-31"
                            className="customInput"
                            {...register("due_at", {
                                required: "Due at is required",
                                validate: validateYears,
                            })}
                        />
                        {errors.due_at && (
                            <p className="err">{errors.due_at.message}</p>
                        )}
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
                            min: {
                                value: 0,
                                message: "Amount must be positive",
                            },
                        })}
                    />
                    {errors.amount && (
                        <p className="err">{errors.amount.message}</p>
                    )}
                </div>
                <div className="flex justify-center gap-5">
                    <input
                        type="submit"
                        value={invoice ? "Update" : "Submit"}
                        className="btn btn-secondary"
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

function validateYears(value) {
    if (value < "1990-01-01") {
        return "Date must be after 1990-01-01";
    }
    if (value > "2099-12-31") {
        return "Date must be before 2099-12-31";
    }

    return true;
}
