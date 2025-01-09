import express from 'express';
import dotenv from 'dotenv';

import { testConnection } from './utils/database';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

async function startServer() {
    try {
        await testConnection();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

export default app;