const { cookieJwtAuth } = require("../../middleware/cookieJwtAuth");
const express = require('express')
const router = express.Router()
const invoiceController = require('./invoice.controllers')

// router.use(cookieJwtAuth);

router.route('/invoice')
    .get(cookieJwtAuth, invoiceController.index)
    .post(cookieJwtAuth, invoiceController.store)
    .delete(cookieJwtAuth, invoiceController.delete);

router.get('/invoice/:id/', cookieJwtAuth, invoiceController.show);
router.put('/invoice/:id/', cookieJwtAuth, invoiceController.update);

module.exports = router;