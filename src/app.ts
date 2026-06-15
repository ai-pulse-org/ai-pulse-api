import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.route';
import productRoutes from './routes/product.route';
import errorHandler from './middlewares/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', healthRoutes);
app.use('/', productRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
