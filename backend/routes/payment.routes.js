const express =  require('express');
const { getLastDues, paymentByNC, getLastPayment, getPaidMonths } = require('../controllers/payment.controller');
const router =  new express.Router();

router.get("/getLastDues", getLastDues);
router.post("/paymentByNC", paymentByNC);
router.get("/getLastPayment", getLastPayment)
router.get("/getPaidMonths", getPaidMonths);

module.exports = router;