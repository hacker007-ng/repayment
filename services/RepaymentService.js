const Repayment = require('../models/RepaymentModel');

class RepaymentService {
  // Fetch repayment schedule for a user
  async getRepaymentSchedule(userId) {
    return await Repayment.findOne({ userId });
  }

  // Make a payment for a specific repaymentId
  async makePayment(userId, repaymentId) {
    try {
      const repayment = await Repayment.findOne({ userId });
  
      if (!repayment) {
        throw new Error('User not found');
      }
  
      const repaymentEntry = repayment.tableRepayment.find(
        (entry) => entry.repaymentId === String(repaymentId)
      );
  
      if (!repaymentEntry) {
        throw new Error('Repayment ID not found');
      }
  
      if (repaymentEntry.status === 'COMPLETED') {
        throw new Error('Payment already completed');
      }
      
      repaymentEntry.status = 'COMPLETED';
      repaymentEntry.paymentDate = new Date();
  
      repayment.markModified('tableRepayment');
  
      await repayment.save();
  
      console.log('Payment updated successfully:', repaymentEntry);
  
      return repaymentEntry;
    } catch (error) {
      console.error('Error during makePayment:', error.message);
      throw error;
    }
  }

  // Fetch outstanding balance for a user
  async getOutstandingBalance(userId) {
    try {
      const repayment = await Repayment.findOne({ userId });
      if (!repayment) {
        console.error('User not found:', userId);
        return res.status(404).json({ message: 'User not found' });
      }

  
      // Ensure tableRepayment is valid
      if (!Array.isArray(repayment.tableRepayment)) {
        console.error('Invalid repayment data structure:', repayment.tableRepayment);
        return res.status(500).json({ error: 'Invalid repayment data structure' });
      }
  
      // Calculate total lent amount
      const totalLent = repayment.principalAmount;
  
      // Calculate total paid amount
      const totalPaid = repayment.tableRepayment.reduce((total, entry) => {
        if (entry.status === 'COMPLETED') {
          return total + entry.principalRepayment;
        }
        return total;
      }, 0);
  
      // Calculate outstanding balance
      const outstandingBalance = totalLent - totalPaid;

  
      return { totalLent, totalPaid, outstandingBalance };
    } catch (error) {
      console.error('Error fetching outstanding balance:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new RepaymentService();