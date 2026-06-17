import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';
import healthRoutes from './routes/health.route';
import quizRoutes from './routes/quiz-session.route';

const app = express();

// CORS middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', healthRoutes);
app.use('/', quizRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
