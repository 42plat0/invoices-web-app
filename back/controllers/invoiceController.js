import express from "express";
import {
    insertInvoice,
    fetchInvoices,
    deleteInvoice,
    fetchInvoice,
    updateInvoice,
} from "../models/invoiceModel.js";

import { protect } from "../utils/pathProtectMW.js";

const invoiceController = express.Router();

invoiceController.get("/", protect, async (req, res) => {
    try {
        const invoices = await fetchInvoices(req?.user.id);

        res.status(200).json({
            status: "success",
            invoices: invoices,
        });
    } catch (error) {
        res.status(400).json({status:"failed", error})
    }
});

invoiceController.get("/:id", protect, async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await fetchInvoice(id, req?.user.id);

        res.status(200).json({
            status: "success",
            invoice: invoice,
        });
    } catch (error) {
        res.status(400).json({status:"failed", error})
    }
});

invoiceController.post("/", protect, async (req, res) => {
    try {
        const invoice = req.body;
        invoice.user_id = req.user.id;
        const newinvoice = await insertInvoice(invoice);

        res.status(200).json({ status: "success", invoice: newinvoice });
    } catch (error) {
        res.status(400).json({status:"failed", error})
    }
});

invoiceController.delete("/:id", protect, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedinvoice = await deleteInvoice(id, req?.user.id);

        res.status(200).json({
            status: "success",
            deleted: deletedinvoice ? "deleted" : "not deleted",
        });
    } catch (error) {
        res.status(400).json({status:"failed", error})
    }
});

invoiceController.put("/:id", protect, async (req, res) => {
    try {
        const invoice = req.body,
            { id } = req.params;
        const updatedInvoice = await updateInvoice(id, invoice, req?.user.id);

        res.status(200).json({ status: "success", invoice: updatedInvoice });
    } catch (error) {
        res.status(400).json({status:"failed", error})
    }
});

export default invoiceController;