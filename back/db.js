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
        CREATE TABLE IF NOT EXISTS invoices (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            client_name TEXT NOT NULL,
            amount NUMERIC NOT NULL,
            status TEXT CHECK (status IN ('draft', 'pending', 'paid')) DEFAULT 'draft',
            created_at TIMESTAMP DEFAULT NOW(),
            due_at TIMESTAMP NOT NULL
        );
    `;
}

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$$$ Model methods $$$$$$$$$
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//---------------------------------------
//------------- GET ---------------------
export const fetchInvoices = async () =>
    await db`
        SELECT * FROM invoices; 
    `;

export const fetchInvoice = async (invoiceId) =>
    await db`
        SELECT * FROM invoices
        WHERE id = ${invoiceId}; 
    `;

// Was gonna use for updates 
// Don't think it's gonna be needed tho, better just use PSQL functions
export const fetchColumns = async (tableName) =>
    await db`
        SELECT * FROM information_schema.columns
        WHERE table_name = ${tableName}; 
    `;

//---------------------------------------
//------------ POST ---------------------
export const insertInvoice = async (invoice) => {
    const keys = Object.keys(invoice);

    const [newInvoice] = await db`
        INSERT INTO invoices
        ${db(invoice, keys)}
        RETURNING *;
    `;

    return newInvoice;
};

//---------------------------------------
//------------ DELETE -------------------
export const deleteInvoice = async (invoiceId) => {
    const [deletedInvoice] = await db`
        DELETE FROM invoices
        WHERE id = ${invoiceId}
        RETURNING *;
    `;

    return Boolean(deletedInvoice);
};

//---------------------------------------
//------------ UPDATE---------------------
export const updateInvoice = async (invoiceId, invoice) => {
    let keys = Object.keys(invoice);
    keys = keys.filter((k) => k !== "due_at" && k !== "id" && k !== "created_at")

    const [updatedInvoice] = await db`
        UPDATE invoices 
        SET ${db(invoice, keys)}
        WHERE id = ${invoiceId}
        RETURNING *; 
        `;

    return updatedInvoice;
};
