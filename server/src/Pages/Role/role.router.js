const { cookieJwtAuth } = require("../../middleware/cookieJwtAuth");
const express = require('express')
const router = express.Router()
const roleController = require('./role.controllers')

// router.use(cookieJwtAuth);

router.route('/role')
    .get(cookieJwtAuth, roleController.index)
    .post(cookieJwtAuth, roleController.store);

router.get('/role/:id/', cookieJwtAuth, roleController.show);
router.put('/role/:id/', cookieJwtAuth, roleController.update);
router.delete('/role/:id', cookieJwtAuth, roleController.delete);

module.exports = router;