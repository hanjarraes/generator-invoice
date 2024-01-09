const { cookieJwtAuth } = require("../../middleware/cookieJwtAuth");
const express = require('express')
const router = express.Router()
const invoiceStatusController = require('./invoiceStatus.controllers')

// router.use(cookieJwtAuth);

router.route('/invoiceStatus')
    .get(cookieJwtAuth, invoiceStatusController.index)
    .post(cookieJwtAuth, invoiceStatusController.store);

router.get('/invoiceStatus/:id/', cookieJwtAuth, invoiceStatusController.show);
router.put('/invoiceStatus/:id/', cookieJwtAuth, invoiceStatusController.update);
router.delete('/invoiceStatus/:id', cookieJwtAuth, invoiceStatusController.delete);

module.exports = router;