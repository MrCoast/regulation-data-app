import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import serverless from 'serverless-http';
import apiController from './controllers/api';

const PORT = process.env.PORT || 3000;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://root:toor@mongo:27017/regulation?authSource=admin';

const app = express();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
app.use(cors());

app.get('/', (req, res) => res.send('OK'));
app.use('/api', apiController);

(async () => {
    await mongoose.connect(DB_CONNECTION_STRING);
})();

export const handler = serverless(app);
