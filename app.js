import express from 'express';
import authRoutes from './routes/auth.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/users', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
