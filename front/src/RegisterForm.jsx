import { useForm } from "react-hook-form";
import "./static/app.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { InvoiceContext } from "./contexts/InvoiceContext";

export default function RegisterForm({ submitCompleted }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState(null);
    const { setUser} = useContext(UserContext);
    const {fetchInvoices} = useContext(InvoiceContext);
    const nav = useNavigate();

    const API_URL = import.meta.env.VITE_AUTH_API_URL;

    const sendForm = async (data) => {
        try {
            const res = await axios.post(`${API_URL}/register`, data, {withCredentials: true});
            setUser(res.data.user);
            await fetchInvoices();
            submitCompleted();
            goHomeHandler();
        } catch (error) {
            setError(error.response.data.errors);
        }
    };

    const goHomeHandler = () => nav("/");
    const goLoginHandler = () => nav("/auth/login");

    return (
        <div className="flex flex-col w-fit justify-center bg-white text-center p-5">
            {error && <p className="err">{error}</p>}
            <form
                className="flex flex-col text-2xl gap-3"
                onSubmit={handleSubmit(sendForm)}
                noValidate
            >
                <div className="flex flex-col">
                    <div className="flex py-2 justify-between">
                        <label
                            className="customInput-label"
                            htmlFor="username"
                        >
                            Username
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
                        id="usernameField"
                        className="customInput"
                        {...register("username", {
                            required: "Username is required",
                        })}
                    />
                    {errors.username && (
                        <p className="err">{errors.username.message}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    {/* Select */}
                    <label htmlFor="email" className="customInput-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="emailField"
                        name="email"
                        className="customInput customInput-select"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    {errors.email && (
                        <p className="err">{errors.email.message}</p>
                    )}
                </div>

                <div className="flex gap-3">
                    <div className="flex flex-col">
                        <label className="customInput-label" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            className="customInput"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        {errors.password && (
                            <p className="err">{errors.password.message}</p>
                        )}
                    </div>
                
                <div className="flex flex-col">
                    <label className="customInput-label" htmlFor="conf_password">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="customInput"
                        {...register("conf_password", {
                            required: "Confirm Password is required",
                        })}
                    />
                    {errors.conf_password && (
                        <p className="err">{errors.conf_password.message}</p>
                    )}
                </div>
                </div>

                <div className="flex justify-center gap-5">
                    <input
                        type="submit"
                        value="Register"
                        className="btn btn-primary"
                    />
                    <button className="btn btn-secondary" onClick={goLoginHandler}>Login</button>
                </div>
            </form>
        </div>
    );
}
