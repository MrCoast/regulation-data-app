import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { RegulationDocument } from '../models/regulation-document';
import { getS3KeyByUrl } from '../utils/utils';
import S3Client from '../utils/s3Client';

type TransferOptions = {
    limit: number;
    awsRegion: string;
    awsS3Bucket: string;
};

type LeanDocument = {
    [key: string]: unknown;
    source: string;
}

export default class TransferDocumentsCommand {
    constructor(
        private options: TransferOptions,
    ) {}

    public async execute() {
        const sourceDocuments = await this.getSourceDocuments();

        await this.writeDocumentsToTarget(sourceDocuments);
    }

    private async getSourceDocuments() {
        const filter = {};
        const projection = null;
        const queryOptions = {
            sort: { createdAt: 1 },
            limit: this.options.limit,
        };

        return RegulationDocument.find(filter, projection, queryOptions).lean();
    }

    private async writeDocumentsToTarget(sourceDocuments: LeanDocument[]) {
        for (const document of sourceDocuments) {
            const jsonDocumentString = JSON.stringify(document);

            console.info(`Writing document: source = ${document.source}`);

            try {
                await this.writeDocumentToTarget(getS3KeyByUrl(document.source), jsonDocumentString);
            } catch (e) {
                console.error(`Error when writing document: source = ${document.source}`);
            }
        }

        console.info(`Writing documents completed`);
    }

    private async writeDocumentToTarget(documentKey: string, jsonDocumentString: string) {
        const s3Client = S3Client.getInstance(this.options.awsRegion).getClient();

        const params: PutObjectRequest = {
            Bucket: this.options.awsS3Bucket,
            Key: documentKey,
            Body: jsonDocumentString,
        };

        await s3Client.putObject(params).promise();
    }
}
