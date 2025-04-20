import express from "express";
import {
    insertInvoice,
    fetchInvoices,
    deleteInvoice,
    fetchInvoice,
    updateInvoice,
    fetchColumns,
} from "./db.js";
import { createCookie, setCookie, clearCookie, isCookieValid } from "./auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const invoices = await fetchInvoices();

        res.status(200).json({
            status: "success",
            invoices: invoices,
        });
    } catch (error) {
        console.error(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await fetchInvoice(id);

        res.status(200).json({
            status: "success",
            invoice: invoice,
        });
    } catch (error) {
        console.error(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const invoice = req.body;
        const newinvoice = await insertInvoice(invoice);

        res.status(200).json({ status: "success", invoice: newinvoice });
    } catch (error) {
        console.error(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedinvoice = await deleteInvoice(id);

        res.status(200).json({
            status: "success",
            deleted: deletedinvoice ? "deleted" : "not deleted",
        });
    } catch (error) {
        console.error(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const invoice = req.body,
            { id } = req.params;
        const updatedInvoice = await updateInvoice(id, invoice);

        res.status(200).json({ status: "success", invoice: updatedInvoice });
    } catch (error) {
        console.error(error);
    }
});
export default router;
