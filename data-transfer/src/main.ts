import mongoose from 'mongoose';
import TransferDocumentsCommand from './commands/transfer-data';

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://root:toor@mongo:27017/regulation?authSource=admin';
const DOCUMENTS_TRANSFER_LIMIT = Number(process.env.DOCUMENTS_TRANSFER_LIMIT || 5);

(async () => {
    await mongoose.connect(DB_CONNECTION_STRING);

    const transferDocumentsCommand = new TransferDocumentsCommand({
        limit: DOCUMENTS_TRANSFER_LIMIT,
    });

    await transferDocumentsCommand.execute();
})();
