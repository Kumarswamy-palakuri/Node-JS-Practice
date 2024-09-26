const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);