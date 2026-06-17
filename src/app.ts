import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';
import healthRoutes from './routes/health.route';
import quizSessionRoutes from './routes/quiz-session.route';
import quizRoutes from './routes/quiz.route';

const app = express();

// CORS middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', healthRoutes);
app.use('/', quizSessionRoutes);
app.use('/quiz', quizRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
