import { useForm } from "react-hook-form";
import "./static/app.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function LoginForm({ submitCompleted }) {
    const { register, handleSubmit, setValue, reset } = useForm();
    const [ error, setError ] = useState(null);
    const { user, setUser } = useContext(UserContext);
    const nav = useNavigate();
    
    const API_URL = import.meta.env.VITE_AUTH_API_URL;

    const sendForm = async (data) => {
        try {
            const res = await axios.post(`${API_URL}/login`, data, {
                withCredentials: true,
            });

            if (res.status === 200){
                setUser(res.data.user);
                submitCompleted();
                goHomeHandler();
                
            }
        } catch (error) {
            setError(error);
        }
    };

    const goHomeHandler = () => nav("/");

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
                        name="username"
                        className="customInput"
                        {...register("username", {
                            required: "Username is required",
                        })}
                    />
                </div>
                
                <div className="flex flex-col">
                    <label className="customInput-label" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="passwordField"
                        name="password"
                        className="customInput"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                </div>
                <div className="flex justify-center gap-5">
                    <button
                        className="btn btn-primary"
                    >Login</button>
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
