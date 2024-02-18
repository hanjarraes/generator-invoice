const db = require('../../../models');
const { UserLog, UserRole, RoleModule } = db;

module.exports = {
    index: async (req, res) => {
        try {
            const userRoleData = await UserRole.findAll({
                include: RoleModule,
            });

            if (userRoleData) {
                res.json({
                    data: userRoleData,
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
            const userRoleData = await UserRole.findByPk(id, {
                include: RoleModule,
            });

            if (userRoleData) {
                // log
                await UserLog.create({ user_id: userId, activity: `Showing data for Role ID ${id} by ${username}` });

                return res.json({
                    data: userRoleData,
                    status: 200,
                    message: 'Data found successfully',
                    url: req.url,
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: 'Data not found',
                    url: req.url,
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({
                status: 500,
                message: 'Failed to fetch data',
                error: error.message,
            });
        }
    },

    store: async (req, res) => {
        const { role, description, module } = req.body;
        const { userId, username } = req.session;

        try {
            const userRole = await UserRole.create({
                role: role,
                description: description,
            });

            const createdModules = await Promise.all(module.map(async (mod) => {
                return await RoleModule.create({
                    users_role_id: userRole.id,
                    module: mod.module,
                    description: mod.description,
                });
            }));

            // log
            await UserLog.create({ user_id: userId, activity: `Creating new Role ${role} by ${username}` });

            res.json({
                data: { userRole, createdModules },
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
        const { role, description, module } = req.body;
        const { userId, username } = req.session;
        
        const newDataRespon = {
            id: id,
            role: role,
            description: description,
            module: module
        }


        try {
            const existingRole = await UserRole.findByPk(id, { include: RoleModule });

            if (!existingRole) {
                return res.status(404).json({
                    status: 404,
                    message: 'Role not found',
                    url: req.url,
                });
            }

            // Periksa modul yang dihapus dari perubahan
            const modulesToDelete = existingRole.RoleModules.filter(existingModule => {
                return !module.some(updatedModule => updatedModule.module === existingModule.module);
            });

            // Hapus modul yang tidak ada dalam data pembaruan
            await Promise.all(modulesToDelete.map(async (moduleToDelete) => {
                await RoleModule.destroy({ where: { id: moduleToDelete.id } });
            }));

            // Tambah modul yang baru atau perbarui yang ada
            await Promise.all(module.map(async (updatedModule) => {
                const existingModule = existingRole.RoleModules.find(module => module.module === updatedModule.module);
                if (existingModule) {
                    await existingModule.update({
                        module: updatedModule.module,
                        description: updatedModule.description,
                    });
                } else {
                    await RoleModule.create({
                        users_role_id: id,
                        module: updatedModule.module,
                        description: updatedModule.description,
                    });
                }
            }));

            await existingRole.update({
                role: role,
                description: description,
            });

            // Log
            await UserLog.create({ user_id: userId, activity: `Updating Role ${role} by ${username}` });

            res.json({
                data: newDataRespon,
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
        const { userId, username } = req.session;
        const { id } = req.body;
        try {
            const userRole = await UserRole.findByPk(id);

            if (!userRole) {
                return res.status(404).json({
                    status: 404,
                    message: 'User Role not found',
                    url: req.url,
                });
            }

            // Temukan dan hapus Modul Peran terkait terlebih dahulu
           await RoleModule.destroy({ where: { users_role_id: id } });

            // Setelah Modul Peran dihapus, hapus Peran Pengguna
            await UserRole.destroy({ where: { id: id } });

            // Catat aktivitas penghapusan
            await UserLog.create({
                user_id: userId,
                activity: `Deleting User Role ID ${id} by ${username}`
            });

            const userRoleData = await UserRole.findAll({
                include: RoleModule,
            });

            res.json({
                data: userRoleData,
                status: 200,
                message: 'User Role and associated Role Modules deleted successfully',
                url: req.url,
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Failed to delete User Role',
                error: error.message,
            });
        }
    },

};
