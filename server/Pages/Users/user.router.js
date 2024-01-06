const { cookieJwtAuth } = require("../../middleware/cookieJwtAuth");
const express = require('express')
const router = express.Router()


const userController = require('./user.controllers')

router.route('/user')
    .get(cookieJwtAuth, userController.index)
    .post(cookieJwtAuth, userController.store)
router.get('/user/:userId/', cookieJwtAuth, userController.show);
router.put('/user/:userId/', cookieJwtAuth, userController.update);
router.delete('/user/:userId', cookieJwtAuth, userController.delete);

module.exports = router