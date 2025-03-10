import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';
import testRoutes from './routes/testRoutes';

const app = express();

app.use(cors());
app.use(morgan('dev')); // console logging
app.use(express.json())
app.use('/api', userRoutes);
app.use('/test', testRoutes);
// app.use('/auth', authRoutes);

export default app;