const bcrypt = require('bcrypt');
const db = require('../../Model');
const Users = db.User;
const UsersLog = db.UserLog;
const saltRounds = 10;

module.exports = {
    index: async (req, res) => {
        try {
            const usersData = await Users.findAll({});
            if (usersData.length > 0) {
                res.json({
                    data: usersData,
                    status: true,
                    message: 'Data Found',
                    url: req.url,
                });
            } else {
                res.json({
                    status: false,
                    message: 'Data Not Found',
                    url: req.url,
                });
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Failed to fetch data',
                error: error.message,
            });
        }
    },

    show: async (req, res) => {
        const id = req.params.id;
        const loggedInUser = req.user;

        try {
            const userData = await Users.findOne({ where: { id: id } });
            if (userData) {
                // log
                await UsersLog.create({ activity: `Showing data for User ID ${id} by ${loggedInUser.username}` });

                return res.json({
                    data: userData,
                    status: true,
                    message: 'Data found successfully',
                    url: req.url,
                });
            } else {
                return res.status(404).json({
                    status: false,
                    message: 'Data not found',
                    url: req.url,
                });
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Failed to fetch data',
                error: error.message,
            });
        }
    },

    store: async (req, res) => {
        const { email, username, password } = req.body;
        const loggedInUser = req.user;

        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = await Users.create({
                email: email,
                username: username,
                password: hashedPassword,
            });

            // log
            await UsersLog.create({ activity: `Creating new user with username ${username} by ${loggedInUser.username}` });

            res.json({
                data: user,
                status: true,
                message: 'Data added successfully',
                url: req.url,
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Failed to add data',
                error: error.message,
            });
        }
    },

    update: async (req, res) => {
        const id = req.params.id;
        const loggedInUser = req.user; 

        try {
            const userData = await Users.findByPk(id);

            if (!userData) {
                return res.status(404).json({
                    status: false,
                    message: 'Data not found',
                    url: req.url,
                });
            }

            const { email, username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            await Users.update(
                { email: email, username: username, password: hashedPassword },
                { where: { id: id } }
            );

            // log
            await UsersLog.create({ activity: `Updating data for User ID ${id} by ${loggedInUser.username}` });

            const updatedUser = await Users.findByPk(id);

            res.json({
                data: updatedUser,
                status: true,
                message: 'Data edited successfully',
                url: req.url,
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Failed to edit data',
                error: error.message,
            });
        }
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const loggedInUser = req.user; 

        try {
            const deletedUser = await Users.findOne({ where: { id: id } });

            if (!deletedUser) {
                return res.status(404).json({
                    status: false,
                    message: 'Data not found',
                    url: req.url,
                });
            }

            await Users.destroy({ where: { id: id } });

            // log
            await UsersLog.create({ activity: `Deleting data for User ID ${id} by ${loggedInUser.username}` });

            res.json({
                data: deletedUser,
                status: true,
                message: 'Data successfully deleted',
                url: req.url,
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Failed to delete data',
                error: error.message,
            });
        }
    },
};
