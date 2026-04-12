import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import memberRoutes from './routes/member.routes';
import donationRoutes from './routes/donation.routes';
import newsRoutes from './routes/news.routes';
import committeeRoutes from './routes/committee.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'https://express-js-on-vercel-ten-livid-15.vercel.app',
    'https://bishnupur-insaf-foundation.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.use('/api/members', memberRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/committees', committeeRoutes);

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running correctly.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
