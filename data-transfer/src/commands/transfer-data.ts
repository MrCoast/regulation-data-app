import { RegulationDocument } from '../models/regulation-document';
import { getS3KeyByUrl } from '../utils/utils';

type TransferOptions = {
    limit: number;
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

        await TransferDocumentsCommand.writeDocumentsToTarget(sourceDocuments);
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

    private static async writeDocumentsToTarget(sourceDocuments: LeanDocument[]) {
        for (const document of sourceDocuments) {
            const jsonDocumentString = JSON.stringify(document);

            await TransferDocumentsCommand.writeDocumentToTarget(getS3KeyByUrl(document.source), jsonDocumentString);
        }
    }

    private static async writeDocumentToTarget(documentKey: string, jsonDocumentString: string) {
        console.log(`documentKey = ${documentKey}, jsonDocumentString = ${jsonDocumentString.substring(0, 20)}`);
    }
}
