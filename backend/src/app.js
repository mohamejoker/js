import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import { authenticateToken, authorizeRole } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// نقطة اختبار
app.get('/api', (req, res) => {
  res.json({ message: 'Backend Node.js API is working with SQLite!' });
});

// ربط راوت المستخدمين
app.use('/api/users/login', userRoutes);
app.use('/api/users', authenticateToken, authorizeRole('admin'), userRoutes);
app.use('/api/services', authenticateToken, authorizeRole('admin'), serviceRoutes);
app.use('/api/orders', authenticateToken, authorizeRole('admin'), orderRoutes);
app.use('/api/transactions', authenticateToken, authorizeRole('admin'), transactionRoutes);
app.use('/api/site-settings', authenticateToken, authorizeRole('admin'), settingsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
