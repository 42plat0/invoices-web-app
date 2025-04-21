import { db } from "../db.js";

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
    keys = keys.filter((k) => k !== "id" && k !== "created_at")

    const [updatedInvoice] = await db`
        UPDATE invoices 
        SET ${db(invoice, keys)}
        WHERE id = ${invoiceId}
        RETURNING *; 
        `;

    return updatedInvoice;
};

