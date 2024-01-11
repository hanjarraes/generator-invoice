const bcrypt = require('bcrypt');
const db = require('../../../models');
const { User, UserLog, UserRole } = db;
const saltRounds = 10;

module.exports = {
    index: async (req, res) => {
        try {
            const usersData = await User.findAll({
                include: UserRole,
            });
            if (usersData.length > 0) {
                res.json({
                    data: usersData,
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
            const userData = await User.findOne({
                where: { id: id },
                include: UserRole
            });

            if (!userData) {
                return res.status(404).json({
                    status: 404,
                    message: 'Data not found',
                    url: req.url,
                });
            }

            const userRole = userData.UserRole;
            const newData = {
                id: userData.id,
                role: userRole.role,
                description: userRole.description,
                status: userData.status,
                email: userData.email,
                username: userData.username
            }

            // log
            await UserLog.create({
                user_id: loggedInUser.id,
                activity: `Showing data for User ID ${id} by ${loggedInUser.username}`
            });

            return res.json({
                data: newData,
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
        const { user_role_id, email, username, password } = req.body;
        const loggedInUser = req.session.userId;

        try {
            const userRoleExists = await UserRole.findByPk(user_role_id);

            if (!userRoleExists) {
                return res.status(404).json({
                    status: 404,
                    message: 'UserRole not found',
                    error: `UserRole with ID ${user_role_id} does not exist`,
                });
            }

            const existingUser = await User.findOne({ where: { email: email } });
            if (existingUser) {
                return res.status(400).json({
                    status: 400,
                    message: 'Email already exists',
                    error: 'This email is already registered',
                });
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = await User.create({
                user_role_id: user_role_id,
                email: email,
                username: username,
                password: hashedPassword,
            });

            // log
            await UserLog.create({
                user_id: loggedInUser.id,
                activity: `Creating new user with username ${username} by ${loggedInUser.username}`
            });

            res.json({
                data: user,
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
        const id = req.params.id;
        const loggedInUser = req.session.userId;

        try {
            const userData = await User.findByPk(id);

            if (!userData) {
                return res.status(404).json({
                    status: 404,
                    message: 'Data not found',
                    url: req.url,
                });
            }

            const {
                email,
                username,
                password,
                user_role_id,
                status
            } = req.body;

            const userRoleExists = await UserRole.findByPk(user_role_id);

            if (!userRoleExists) {
                return res.status(404).json({
                    status: 404,
                    message: 'UserRole not found',
                    error: `UserRole with ID ${user_role_id} does not exist`,
                });
            }

            if (email !== userData.email) {
                const existingUser = await User.findOne({ where: { email: email } });
                if (existingUser) {
                    return res.status(400).json({
                        status: 400,
                        message: 'Email already exists',
                        error: 'This email is already registered',
                    });
                }
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            await User.update(
                { user_role_id: user_role_id, email: email, username: username, password: hashedPassword, status: status },
                { where: { id: id } }
            );

            // log
            await UserLog.create({ user_id: loggedInUser.id, activity: `Updating data for User ID ${id} by ${loggedInUser.username}` });

            const updatedUser = await User.findByPk(id);

            const responNewData = {
                id: updatedUser.id,
                user_role_id: updatedUser.user_role_id,
                email: updatedUser.email,
                username: updatedUser.username,
                created_at: updatedUser.created_at,
                updated_at: updatedUser.updated_at
            }

            res.json({
                data: responNewData,
                status: 200,
                message: 'Data edited successfully',
                url: req.url,
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Failed to edit data',
                error: error.message,
            });
        }
    },


    delete: async (req, res) => {
        const id = req.params.id;
        const loggedInUser = req.session.userId;

        try {
            const deletedUser = await User.findOne({ where: { id: id } });

            if (!deletedUser) {
                return res.status(404).json({
                    status: 404,
                    message: 'Data not found',
                    url: req.url,
                });
            }

            await User.destroy({ where: { id: id } });

            // log
            await UserLog.create({ user_id: loggedInUser.id, activity: `Deleting data for User ID ${id} by ${loggedInUser.username}` });

            res.json({
                data: deletedUser,
                status: true,
                message: 'Data successfully deleted',
                url: req.url,
            });
        } catch (error) {
            console.error('Error deleting data:', error);
            res.status(500).json({
                status: false,
                message: 'Failed to delete data',
                error: error.message,
            });
        }
    },
};
