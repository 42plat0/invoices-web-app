import postgres from "postgres";

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$$$ Configuration $$$$$$$$$
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export const db = postgres({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_UNAME,
    password: process.env.DB_PW,
});

export const testDbConnection = async () => {
    try {
        await db`SELECT 1`;
        await initTable();
        console.log("Connection to database established");
    } catch (error) {
        console.error("Couldn't establish database connection", error);
        throw new Error(error);
    }
};

async function initTable() {
    await db`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) UNIQUE NOT NULL,
            email VARCHAR(200) UNIQUE NOT NULL,
            password_hash VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `;

    await db`
        CREATE TABLE IF NOT EXISTS invoices (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id INT NOT NULL REFERENCES users(id),
            client_name TEXT NOT NULL,
            amount NUMERIC NOT NULL,
            status TEXT CHECK (status IN ('draft', 'pending', 'paid')) DEFAULT 'draft',
            created_at TIMESTAMP DEFAULT NOW(),
            due_at TIMESTAMP NOT NULL
        );
    `;
}