const { cookieJwtAuth } = require("../../middleware/cookieJwtAuth");
const express = require('express')
const router = express.Router()
const currencyController = require('./currency.controllers')

// router.use(cookieJwtAuth);

router.route('/currency')
    .get(cookieJwtAuth, currencyController.index)
    .post(cookieJwtAuth, currencyController.store);

router.get('/currency/:id/', cookieJwtAuth, currencyController.show);
router.put('/currency/:id/', cookieJwtAuth, currencyController.update);
router.delete('/currency/:id', cookieJwtAuth, currencyController.delete);

module.exports = router;