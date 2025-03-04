import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes'

const app = express();

app.use(cors());
app.use(morgan('dev')); // console logging
app.use('/api', userRoutes);

export default app;