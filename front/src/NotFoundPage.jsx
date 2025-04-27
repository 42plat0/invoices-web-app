import { useNavigate } from "react-router";
import "./static/NotFoundPage.css"

export default function NotFoundPage() {
    const nav = useNavigate();

    const goHomeHandler = () => nav("/");

    return (
        <div className="not-found">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <button
                className="btn btn-primary"
                onClick={goHomeHandler}
            >
                Go Home
            </button>
        </div>
    );
}