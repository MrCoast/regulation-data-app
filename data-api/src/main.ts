import express from 'express';
import mongoose from 'mongoose';
import serverless from 'serverless-http';
import regulationController from './controllers/regulation';

const PORT = process.env.PORT || 3000;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://root:toor@mongo:27017/regulation?authSource=admin';

const app = express();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.get('/', (req, res) => res.send('OK'));
app.use('/regulation', regulationController);

(async () => {
    await mongoose.connect(DB_CONNECTION_STRING);
})();

export const handler = serverless(app);
