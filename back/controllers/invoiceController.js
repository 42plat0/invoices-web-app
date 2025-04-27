import express from "express";
import {
    insertInvoice,
    fetchInvoices,
    deleteInvoice,
    fetchInvoice,
    updateInvoice,
} from "../models/invoiceModel.js";

import { protect } from "../utils/pathProtectMW.js";
import { allowedTo } from "../utils/validators/roleCheckMW.js";
import { getUserById } from "../models/userModel.js";

const invoiceController = express.Router();

invoiceController.get("/", protect, allowedTo("admin", "user"), async (req, res) => {
    try {
        let invoices;

        if (req.user.role === "admin") {
            invoices = await fetchInvoices();
            invoices = await Promise.all(
                invoices.map(async (i) => {
                    return {
                        ...i,
                        owner: (await getUserById(i.user_id)).username,
                    };
                })
            );
        } else {
            invoices = await fetchInvoices(req?.user.id);
        }

        res.status(200).json({
            status: "success",
            invoices: invoices,
        });
    } catch (error) {
        res.status(400).json({ status: "failed", error });
    }
});

invoiceController.get("/:id", protect, allowedTo("admin", "user"), async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await fetchInvoice(id, req?.user.id);

        res.status(200).json({
            status: "success",
            invoice: invoice,
        });
    } catch (error) {
        res.status(400).json({ status: "failed", error });
    }
});

invoiceController.post("/", protect, allowedTo("admin", "user"), async (req, res) => {
    try {
        const invoice = req.body;
        invoice.user_id = !invoice.user_id ? req.user.id : parseInt(invoice.user_id);
        console.log(invoice)

        const newinvoice = await insertInvoice(invoice);


        res.status(200).json({ status: "success", invoice: newinvoice });
    } catch (error) {
        res.status(400).json({ status: "failed", error });
    }
});

invoiceController.delete("/:id", protect, allowedTo("admin", "user"), async (req, res) => {
    try {
        const { id } = req.params;
        const deletedinvoice = await deleteInvoice(id, req?.user.id);

        res.status(200).json({
            status: "success",
            deleted: deletedinvoice ? "deleted" : "not deleted",
        });
    } catch (error) {
        res.status(400).json({ status: "failed", error });
    }
});

invoiceController.put("/:id", protect, allowedTo("admin", "user"), async (req, res) => {
    try {
        const invoice = req.body,
            { id } = req.params;
        const updatedInvoice = await updateInvoice(id, invoice);

        res.status(200).json({ status: "success", invoice: updatedInvoice });
    } catch (error) {
        res.status(400).json({ status: "failed", error });
    }
});

export default invoiceController;
