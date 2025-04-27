import { useForm } from "react-hook-form";
import "./static/app.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";
import { UserContext } from "./contexts/UserContext";

export default function LoginForm({ submitCompleted }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ error, setError ] = useState(null);
    const { setUser } = useContext(UserContext);
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
            setError(error.response.data.errors);
        }
    };

    const goHomeHandler = () => nav("/");
    
    const goRegisterHandler = () => nav("/auth/register");

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
                        name="username"
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
                    {errors.password && (
                        <p className="err">{errors.password.message}</p>
                    )}
                </div>
                <div className="flex justify-center gap-5">
                    <button
                        className="btn btn-primary"
                    >Login</button>
                    <button className="btn btn-secondary" onClick={goRegisterHandler}>Register</button>
                </div>
            </form>
        </div>
    );
}
