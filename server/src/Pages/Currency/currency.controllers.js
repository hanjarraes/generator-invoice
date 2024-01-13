const db = require('../../../models');
const { InvoiceCurrency, UserLog } = db;

module.exports = {
    index: async (req, res) => {
        try {
            const InvoiceCurrencyData = await InvoiceCurrency.findAll({});
            if (InvoiceCurrencyData.length > 0) {
                res.json({
                    data: InvoiceCurrencyData,
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
    },

    show: async (req, res) => {
        const id = req.params.id;
        const { userId, username } = req.session;
        try {
            const InvoiceCurrencyData = await InvoiceCurrency.findOne({
                where: { id: id },
            });

            if (!InvoiceCurrencyData) {
                return res.status(404).json({
                    status: 404,
                    message: 'Data not found',
                    url: req.url,
                });
            }

            // log
            await UserLog.create({
                user_id: userId,
                activity: `Showing data for Curreny ID ${id} by ${username}`
            });

            return res.json({
                data: InvoiceCurrencyData,
                status: 200,
                message: 'Data found successfully',
                url: req.url,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Failed to fetch data',
                error: error.message,
            });
        }
    },

    store: async (req, res) => {
        const { currency, description } = req.body;
        const { userId, username } = req.session;

        try {
            const InvoiceCurrencyData = await InvoiceCurrency.create({
                currency: currency,
                description: description,
            });

            // log
            await UserLog.create({ user_id: userId, activity: `Creating new Currency ${currency} by ${username}` });

            res.json({
                data: { InvoiceCurrencyData },
                status: 200,
                message: 'Data added successfully',
                url: req.url,
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Failed to add data',
                error: error.message,
            });
        }
    },

    update: async (req, res) => {
        const currencyId = req.params.id;
        const { currency, description } = req.body;
        const { userId, username } = req.session;

        try {
            const InvoiceCurrencyData = await InvoiceCurrency.findByPk(currencyId);

            if (!InvoiceCurrencyData) {
                return res.status(404).json({
                    status: 404,
                    message: 'Currency not found',
                    url: req.url,
                });
            }

            await InvoiceCurrencyData.update({
                currency: currency,
                description: description,
            });

            // Log the update activity
            await UserLog.create({
                user_id: userId,
                activity: `Updating Currency ID ${currencyId} by ${username}`
            });

            res.json({
                data: { InvoiceCurrencyData },
                status: 200,
                message: 'Data updated successfully',
                url: req.url,
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Failed to update data',
                error: error.message,
            });
        }
    },

    delete: async (req, res) => {
        const currencyId = req.params.id;
        const { userId, username } = req.session;

        try {
            const InvoiceCurrencyData = await InvoiceCurrency.findByPk(currencyId);

            if (!InvoiceCurrencyData) {
                return res.status(404).json({
                    status: 404,
                    message: 'Currency not found',
                    url: req.url,
                });
            }

            await InvoiceCurrency.destroy({ where: { id: currencyId } });

            // Log the deletion activity
            await UserLog.create({
                user_id: userId,
                activity: `Deleting Currency ID ${currencyId} by ${username}`
            });

            res.json({
                data: { InvoiceCurrencyData },
                status: 200,
                message: 'Data deleted successfully',
                url: req.url,
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Failed to delete data',
                error: error.message,
            });
        }
    },

};
