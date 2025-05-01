const express = require('express');
const mongoose = require('mongoose');
const repaymentRoutes = require('./routes/repaymentRoutes');
const cors = require('cors');
const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/repayments', repaymentRoutes);


mongoose.connect('mongodb://localhost:27017/loanRepayment')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});