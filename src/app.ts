import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import orgRoutes from './routes/org.routes';
import projectRoutes from './routes/project.routes';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/orgs', orgRoutes);
app.use('/api/projects', projectRoutes);

export default app;
