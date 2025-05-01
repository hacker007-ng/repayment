const repaymentService = require('../services/RepaymentService');

class RepaymentController {
  // Controller to fetch repayment schedule
  async getRepaymentSchedule(req, res) {
    try {
      const { userId } = req.params;
      const schedule = await repaymentService.getRepaymentSchedule(userId);

      if (!schedule) {
        return res.status(404).json({ message: 'Repayment schedule not found' });
      }

      res.json(schedule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Controller to make a payment
  async makePayment(req, res) {
    try {
      const { userId, repaymentId } = req.params;
      const updatedRepayment = await repaymentService.makePayment(userId, repaymentId);

      res.json({ message: 'Payment completed successfully', data: updatedRepayment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Controller to fetch outstanding balance
  async getOutstandingBalance(req, res) {
    try {
      const { userId } = req.params;
      const balance = await repaymentService.getOutstandingBalance(userId);
       
      res.json(balance);
    } catch (error) {
        console.log('req-params: '+ req.url);
      res.status(500).json({ error: error.message });
    }
  }

//   // NEW: Controller to fetch total outstanding payment based on PENDING status
  
}

module.exports = new RepaymentController();