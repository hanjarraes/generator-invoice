const db = require('../../../models');
const { UserLog, InvoiceStatus, InvoiceCurrency, Invoice, InvoiceItem } = db;

module.exports = {
    index: async (req, res) => {
        try {
            const invoices = await Invoice.findAll({
                include: [
                    { model: InvoiceStatus },
                    { model: InvoiceCurrency },
                    { model: InvoiceItem },
                ],
                order: [['currentDate', 'DESC']],
            });
    
            if (invoices && invoices.length > 0) {
                const newResponseData = invoices.map(invoice => ({
                    id: invoice.id,
                    invoice_no: invoice.invoiceNo,
                    billTo: invoice.billTo,
                    billToAddress: invoice.billToAddress,
                    billToEmail: invoice.billToEmail,
                    status: invoice.InvoiceStatus.status,
                    current_date: invoice.currentDate,
                    due_date: invoice.dateOfIssue,
                    total: invoice.total,
                    allInfo: {
                        description: invoice.description,
                        billFrom: invoice.billFrom,
                        billFromAddress: invoice.billFromAddress,
                        billFromEmail: invoice.billFromEmail,
                        billTo: invoice.billTo,
                        billToAddress: invoice.billToAddress,
                        billToEmail: invoice.billToEmail,
                        invoice_status_id: invoice.InvoiceStatus.id,
                        status: invoice.InvoiceStatus.status,
                        invoice_currency_id: invoice.InvoiceStatus.id,
                        currency: invoice.currency,
                        currentDate: invoice.currentDate,
                        dateOfIssue: invoice.dateOfIssue,
                        discountAmount: invoice.discountAmount,
                        discountRate: invoice.discountRate,
                        invoiceNo: invoice.invoiceNo,
                        notes: invoice.notes,
                        subTotal: invoice.subTotal,
                        taxAmount: invoice.taxAmount,
                        taxRate: invoice.taxRate,
                        total: invoice.total,
                        items: invoice.InvoiceItems
                    }
                }));
    
                res.json({
                    data: newResponseData,
                    status: 200,
                    message: 'Data Found',
                    url: req.url,
                });
            } else {
                res.json({
                    status: 404,
                    message: 'Data Not Found',
                    url: req.url,
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Failed to fetch data',
                error: error.message,
            });
        }
    }
    ,

    show: async (req, res) => {
        const { userId, username } = req.session;
        try {
            const { id } = req.params;
            const invoice = await Invoice.findByPk(id, {
                include: [
                    { model: InvoiceStatus },
                    { model: InvoiceCurrency },
                    { model: InvoiceItem },
                ],
            });

            if (invoice) {
                await UserLog.create({ user_id: userId, activity: `Showing data for invoice ID ${id} by ${username}` });
                const responseData = {
                    id: invoice.id,
                    invoice_no: invoice.invoiceNo,
                    billTo: invoice.billTo,
                    billToAddress: invoice.billToAddress,
                    billToEmail: invoice.billToEmail,
                    status: invoice.InvoiceStatus.status,
                    current_date: invoice.currentDate,
                    due_date: invoice.dateOfIssue,
                    total: invoice.total,
                    allInfo: {
                        description: invoice.description,
                        billFrom: invoice.billFrom,
                        billFromAddress: invoice.billFromAddress,
                        billFromEmail: invoice.billFromEmail,
                        billTo: invoice.billTo,
                        billToAddress: invoice.billToAddress,
                        billToEmail: invoice.billToEmail,
                        invoice_status_id: invoice.InvoiceStatus.id,
                        status: invoice.InvoiceStatus.status,
                        invoice_currency_id: invoice.InvoiceStatus.id,
                        currency: invoice.currency,
                        currentDate: invoice.currentDate,
                        dateOfIssue: invoice.dateOfIssue,
                        discountAmount: invoice.discountAmount,
                        discountRate: invoice.discountRate,
                        invoiceNo: invoice.invoiceNo,
                        notes: invoice.notes,
                        subTotal: invoice.subTotal,
                        taxAmount: invoice.taxAmount,
                        taxRate: invoice.taxRate,
                        total: invoice.total,
                        items: invoice.InvoiceItems,
                    },
                };

                res.json({
                    data: responseData,
                    status: 200,
                    message: 'Invoice Detail Found',
                    url: req.url,
                });
            } else {
                res.json({
                    status: 404,
                    message: 'Invoice Not Found',
                    url: req.url,
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Failed to fetch data',
                error: error.message,
            });
        }
    },

    store: async (req, res) => {
        const { userId, username } = req.session;
        try {
            const {
                invoice_no,
                allInfo,
            } = req.body;

            const newInvoice = await Invoice.create({
                invoiceNo: invoice_no,
                invoice_status_id: allInfo.invoice_status_id,
                status: allInfo.status,
                invoice_currency_id: allInfo.invoice_currency_id,
                currency: allInfo.currency,
                billFrom: allInfo.billFrom,
                billFromAddress: allInfo.billFromAddress,
                billFromEmail: allInfo.billFromEmail,
                billTo: allInfo.billTo,
                billToAddress: allInfo.billToAddress,
                billToEmail: allInfo.billToEmail,
                currentDate: allInfo.currentDate,
                dateOfIssue: allInfo.dateOfIssue,
                discountAmount: allInfo.discountAmount,
                discountRate: allInfo.discountRate,
                notes: allInfo.notes,
                subTotal: allInfo.subTotal,
                taxAmount: allInfo.taxAmount,
                taxRate: allInfo.taxRate,
                total: allInfo.total,
            });

            const createdInvoiceItems = await Promise.all(allInfo.items.map(async (item) => {
                return await InvoiceItem.create({
                    invoice_id: newInvoice.id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    quantity: item.quantity,
                });
            }));

            await UserLog.create({
                user_id: userId,
                activity: `Create data for invoice ID ${invoice_no} by ${username}`
            });

            res.status(201).json({
                data: { newInvoice, createdInvoiceItems },
                status: 201,
                message: 'Invoice Created',
                url: req.url,
            });

        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Failed to create Invoice',
                error: error.message,
            });
        }
    },

    update: async (req, res) => {
        const id = req.params.id;
        const { userId, username } = req.session;
        try {
            const {
                invoice_no,
                allInfo,
            } = req.body;

            const updatedInvoice = await Invoice.findByPk(id, { include: InvoiceItem });

            if (!updatedInvoice) {
                return res.status(404).json({
                    status: 404,
                    message: 'Invoice not found',
                    url: req.url,
                });
            }

            await updatedInvoice.update({
                invoiceNo: invoice_no,
                invoice_status_id: allInfo.invoice_status_id,
                status: allInfo.status,
                invoice_currency_id: allInfo.invoice_currency_id,
                currency: allInfo.currency,
                billFrom: allInfo.billFrom,
                billFromAddress: allInfo.billFromAddress,
                billFromEmail: allInfo.billFromEmail,
                billTo: allInfo.billTo,
                billToAddress: allInfo.billToAddress,
                billToEmail: allInfo.billToEmail,
                currentDate: allInfo.currentDate,
                dateOfIssue: allInfo.dateOfIssue,
                discountAmount: allInfo.discountAmount,
                discountRate: allInfo.discountRate,
                notes: allInfo.notes,
                subTotal: allInfo.subTotal,
                taxAmount: allInfo.taxAmount,
                taxRate: allInfo.taxRate,
                total: allInfo.total,
            });

            const existingItemIds = updatedInvoice.InvoiceItems.map(item => item.id);
            const incomingItemIds = allInfo.items.map(item => item.id);

            const itemsToRemove = updatedInvoice.InvoiceItems.filter(item => !incomingItemIds.includes(item.id));
            await Promise.all(itemsToRemove.map(async item => {
                await InvoiceItem.destroy({ where: { id: item.id } });
            }));

            await Promise.all(allInfo.items.map(async item => {
                if (existingItemIds.includes(item.id)) {
                    const existingItem = updatedInvoice.InvoiceItems.find(existing => existing.id === item.id);
                    await existingItem.update({
                        name: item.name,
                        description: item.description,
                        price: item.price,
                        quantity: item.quantity
                    });
                } else {
                    await InvoiceItem.create({
                        invoice_id: updatedInvoice.id,
                        name: item.name,
                        description: item.description,
                        price: item.price,
                        quantity: item.quantity,
                    });
                }
            }));

            await UserLog.create({ user_id: userId, activity: `Update data for invoice ID ${id} by ${username}` });

            res.status(200).json({
                data: updatedInvoice,
                status: 200,
                message: 'Invoice updated',
                url: req.url,
            });

        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Failed to update Invoice',
                error: error.message,
            });
        }
    },

    delete: async (req, res) => {
        const { userId, username } = req.session;
        const { id } = req.body;
        try {

            const invoiceToDelete = await Invoice.findByPk(id, { include: InvoiceItem });

            if (!invoiceToDelete) {
                return res.status(404).json({
                    status: 404,
                    message: 'Invoice not found',
                    url: req.url,
                });
            }

            await Promise.all(invoiceToDelete.InvoiceItems.map(async item => {
                await InvoiceItem.destroy({ where: { id: item.id } });
            }));

            await invoiceToDelete.destroy();

            await UserLog.create({ user_id: userId, activity: `Delete data for invoice ID ${id} by ${username}` });

            const invoices = await Invoice.findAll({
                include: [
                    { model: InvoiceStatus },
                    { model: InvoiceCurrency },
                    { model: InvoiceItem },
                ],
                order: [['currentDate', 'DESC']],
            });
            const newResponseData = invoices.map(invoice => ({
                id: invoice.id,
                invoice_no: invoice.invoiceNo,
                billTo: invoice.billTo,
                billToAddress: invoice.billToAddress,
                billToEmail: invoice.billToEmail,
                status: invoice.InvoiceStatus.status,
                current_date: invoice.currentDate,
                due_date: invoice.dateOfIssue,
                total: invoice.total,
                allInfo: {
                    billFrom: invoice.billFrom,
                    billFromAddress: invoice.billFromAddress,
                    billFromEmail: invoice.billFromEmail,
                    billTo: invoice.billTo,
                    billToAddress: invoice.billToAddress,
                    billToEmail: invoice.billToEmail,
                    invoice_status_id: invoice.InvoiceStatus.id,
                    status: invoice.InvoiceStatus.status,
                    invoice_currency_id: invoice.InvoiceStatus.id,
                    currency: invoice.currency,
                    currentDate: invoice.currentDate,
                    dateOfIssue: invoice.dateOfIssue,
                    discountAmount: invoice.discountAmount,
                    discountRate: invoice.discountRate,
                    invoiceNo: invoice.invoiceNo,
                    notes: invoice.notes,
                    subTotal: invoice.subTotal,
                    taxAmount: invoice.taxAmount,
                    taxRate: invoice.taxRate,
                    total: invoice.total,
                    items: invoice.InvoiceItems
                }
            }));

            res.status(200).json({
                data: newResponseData,
                status: 200,
                message: 'Invoice deleted',
                url: req.url,
            });

        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Failed to delete Invoice',
                error: error.message,

            });
        }
    },

};
