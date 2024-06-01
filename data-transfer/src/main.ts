import mongoose from 'mongoose';
import TransferDocumentsCommand from './commands/transfer-data';

const AWS_ACCESS_KEY_ID = process.env.APP_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.APP_AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.APP_AWS_REGION;
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET || 'mancomm-regulation-documents';

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://root:toor@mongo:27017/regulation?authSource=admin';
const DB_COLLECTION_NAME = process.env.DB_COLLECTION_NAME || 'regulationdocuments';
const DOCUMENTS_TRANSFER_LIMIT = Number(process.env.DOCUMENTS_TRANSFER_LIMIT || 5);

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION) {
    throw new Error('Required env variables are missing.');
}

const doTransfer = async () => {
    try {
        await mongoose.connect(DB_CONNECTION_STRING);

        const transferDocumentsCommand = new TransferDocumentsCommand({
            sourceCollectionName: DB_COLLECTION_NAME,
            limit: DOCUMENTS_TRANSFER_LIMIT,
            awsRegion: AWS_REGION,
            awsAccessKeyId: AWS_ACCESS_KEY_ID,
            awsSecretAccessKey: AWS_SECRET_ACCESS_KEY,
            awsS3Bucket: AWS_S3_BUCKET,
        });

        await transferDocumentsCommand.execute();

    } finally {
        await mongoose.connection.close();
    }
};

(async () => {
    // Run transfer immediately on dev environment, because on prod it's just a Lambda handler exported
    if (process.env.NODE_ENV === 'development') {
        await doTransfer();
    }
})();

// Use this handler for a Lambda function
export const handler = doTransfer;
