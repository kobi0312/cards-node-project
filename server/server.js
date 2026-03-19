import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import chalk from 'chalk';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import Card from './models/Card.js';




// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
    process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
];
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. server-to-server, curl) or whitelisted origins
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS blocked for origin: ${origin}`));
        }
    },
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB connection
mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cardsDB')
    .then(() => console.log(chalk.green('Connected to MongoDB')))
    .catch((error) => console.log(chalk.red('MongoDB connection error:', error)));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);

// Sample route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(chalk.red(err.stack));
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
