const db = require('../../../models');
const { InvoiceStatus, UserLog } = db;

module.exports = {
    index: async (req, res) => {
        try {
            const InvoiceStatusData = await InvoiceStatus.findAll({});
            if (InvoiceStatusData.length > 0) {
                res.json({
                    data: InvoiceStatusData,
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
        const loggedInUser = req.session.userId;
        try {
            const InvoiceStatusData = await InvoiceStatus.findOne({
                where: { id: id },
            });

            if (!InvoiceStatusData) {
                return res.status(404).json({
                    status: 404,
                    message: 'Data not found',
                    url: req.url,
                });
            }

            // log
            await UserLog.create({
                user_id: loggedInUser.id,
                activity: `Showing data for Curreny ID ${id} by ${loggedInUser.username}`
            });

            return res.json({
                data: InvoiceStatusData,
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
        const { status, description } = req.body;
        const loggedInUser = req.session.userId;

        try {
            const InvoiceStatusData = await InvoiceStatus.create({
                status: status,
                description: description,
            });

            // log
            await UserLog.create({ activity: `Creating new Status ${status} by ${loggedInUser.username}` });

            res.json({
                data: { InvoiceStatusData },
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
        const statusId = req.params.id;
        const { status, description } = req.body;
        const loggedInUser = req.session.userId;
    
        try {
            const InvoiceStatusData = await InvoiceStatus.findByPk(statusId);
    
            if (!InvoiceStatusData) {
                return res.status(404).json({
                    status: 404,
                    message: 'status not found',
                    url: req.url,
                });
            }
    
            await InvoiceStatusData.update({
                status: status,
                description: description,
            });
    
            // Log the update activity
            await UserLog.create({
                user_id: loggedInUser.id,
                activity: `Updating status ID ${statusId} by ${loggedInUser.username}`
            });
    
            res.json({
                data: { InvoiceStatusData },
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
        const loggedInUser = req.session.userId;
    
        try {
            const InvoiceStatusData = await InvoiceStatus.findByPk(currencyId);
    
            if (!InvoiceStatusData) {
                return res.status(404).json({
                    status: 404,
                    message: 'Currency not found',
                    url: req.url,
                });
            }
    
            await InvoiceStatus.destroy({ where: { id: currencyId } });
    
            // Log the deletion activity
            await UserLog.create({
                user_id: loggedInUser.id,
                activity: `Deleting Currency ID ${currencyId} by ${loggedInUser.username}`
            });
    
            res.json({
                data: { InvoiceStatusData },
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
