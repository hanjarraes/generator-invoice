const { v4: uuidv4 } = require('uuid')
const db = require('../../config/Model')
let users = [
    { uuid: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', userId: 1, name: 'aa' },
    { uuid: 'adsad123-asda-4bad-asda-asdasa1321ad', userId: 2, name: 'bb' },
    { uuid: 'asda12ad-3b7d-sda2-9bdd-123123sadada', userId: 3, name: 'cc' }
]

module.exports = {
    index: (req, res) => {
        // create main Model
        const User = db.User
        console.log(User)
        if (users.length > 0) {
            res.json({
                data: users,
                status: true,
                message: 'Data Found',
                url: req.url,
            });
        } else {
            res.json({
                data: users,
                status: false,
                message: 'Data Not Found',
                url: req.url,
            });
        }
    },
    show: (req, res) => {
        const userId = req.params.userId;
        const showData = users.find(data => data.userId === parseInt(userId));
        if (showData) {
            return res.json({
                data: showData,
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
    },
    store: (req, res) => {
        const { userId, name } = req.body;
        const newData = { uuid: uuidv4(), userId: parseInt(userId), name };
        users.push(newData)
        res.json({
            data: newData,
            status: true,
            massage: 'Data added successfully',
            url: req.url,
        })
    },
    update: (req, res) => {
        const userId = req.params.userId;
        users.forEach(data => {
            if (data.userId === parseInt(userId)) {
                data.name = req.body.name;
            }
        });
        res.json({
            data: req.body,
            status: true,
            massage: 'Data edited successfully',
            url: req.url,
        })
    },
    delete: (req, res) => {
        const userId = req.params.userId;
        const deletedUser = users.find(data => data.id === parseInt(userId));
        users = users.filter(data => data.userId !== parseInt(userId));
        res.json({
            data: deletedUser,
            status: true,
            massage: 'Data successfully deleted',
            url: req.url,
        })
    },
    // update: (req, res) => {
    //     const { userId } = req.params;
    //     const { name, uuid } = req.body;

    //     const userToUpdate = users.find(user => user.userId === parseInt(userId));
    //     if (userToUpdate && userToUpdate.uuid === uuid) {
    //         userToUpdate.name = name;
    //         return res.json({
    //             data: userToUpdate,
    //             status: true,
    //             message: 'Data edited successfully',
    //             url: req.url,
    //         });
    //     } else {
    //         return res.status(404).json({
    //             status: false,
    //             message: 'User not found or UUID is invalid',
    //             url: req.url,
    //         });
    //     }
    // },

    // delete: (req, res) => {
    //     const { userId } = req.params;
    //     const { uuid } = req.body;

    //     const userToDelete = users.find(user => user.userId === parseInt(userId));
    //     if (userToDelete && userToDelete.uuid === uuid) {
    //         users = users.filter(user => user.userId !== parseInt(userId));
    //         return res.json({
    //             status: true,
    //             message: 'Data successfully deleted',
    //             url: req.url,
    //         });
    //     } else {
    //         return res.status(404).json({
    //             status: false,
    //             message: 'User not found or UUID is invalid',
    //             url: req.url,
    //         });
    //     }
    // },
}