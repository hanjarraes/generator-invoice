const { cookieJwtAuth } = require("../../middleware/cookieJwtAuth");
const express = require('express')
const router = express.Router()
const userController = require('./user.controllers')

// router.use(cookieJwtAuth);

router.route('/user')
    .get(cookieJwtAuth, userController.index)
    .post(cookieJwtAuth, userController.store);

router.get('/user/:id/', cookieJwtAuth, userController.show);
router.put('/user/:id/', cookieJwtAuth, userController.update);
router.delete('/user/:id', cookieJwtAuth, userController.delete);

module.exports = router;