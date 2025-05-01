const express = require('express');
const repaymentController = require('../controllers/RepaymentController');

const router = express.Router();

// Route to fetch repayment schedule
router.get('/schedule/:userId', repaymentController.getRepaymentSchedule);

// Route to make a payment
router.post('/payment/:userId/:repaymentId', repaymentController.makePayment);

// Route to fetch outstanding balance
router.get('/balance/:userId', repaymentController.getOutstandingBalance);

module.exports = router;