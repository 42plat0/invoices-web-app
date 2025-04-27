import { useEffect, useState } from "react";
import axios from "axios";

const UserSelector = ({ onSelectUser, defaultValue, register}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_AUTH_API_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${API_URL}/all`, {
                    withCredentials: true,
                });
                setUsers(res.data.users);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p>Loading users...</p>;
    if (error) return <></>;

    return (
        <>
            <div className="flex justify-between">
                <label
                    className="customInput-label"
                    htmlFor="user_id"
                >
                    User
                </label>
            </div>

            <select onChange={(e) => onSelectUser(e.target.value)}
                className="customInput customInput-select"
                defaultValue={defaultValue}
                {...register}

            >
                <option value="">Select a user</option>
                {users.map((u) => (
                    <option key={u.id} value={u.id}>
                        {u.username}
                    </option>
                ))}
            </select>
        </>
    );
};

export default UserSelector;