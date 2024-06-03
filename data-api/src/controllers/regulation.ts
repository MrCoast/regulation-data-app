import express, { Request, Response } from 'express';
import * as regulationService from '../services/regulation';
import * as regulationDocumentMapper from '../mappers/regulation-document';
import { RegulationDocument as RegulationDocumentModel } from '../models/regulation-document';

const router = express.Router();

interface GetRegulationQuery {
    sourceUrl?: string;
}

type DocumentOperationRequest = Request<unknown, unknown, unknown, GetRegulationQuery>;

router.get('/', (req, res) => {
    res
        .status(200)
        .send('Welcome to Regulation controller!');
});

router.get('/preload', async (req: DocumentOperationRequest, res: Response) => {
    try {
        const sourceUrl = req.query.sourceUrl;

        if (!sourceUrl) {
            res
                .status(400)
                .json({
                    status: 'error',
                    error: 'sourceUrl parameter is required',
                });

            return;
        }

        await regulationService.getCachedRegulationData(sourceUrl);

        res
            .status(200)
            .json({
                status: 'ok',
                operation: 'preload',
            });
    } catch (e) {
        console.error(e);

        res
            .status(500)
            .json({
                status: 'error',
                error: e,
            });
    }
});

router.get('/save', async (req: DocumentOperationRequest, res: Response) => {
    try {
        const sourceUrl = req.query.sourceUrl as string;

        if (!sourceUrl) {
            res
                .status(400)
                .json({
                    status: 'error',
                    error: 'sourceUrl parameter is required',
                });

            return;
        }

        const regulationDocumentDto = await regulationService.getCachedRegulationDocument(sourceUrl);
        regulationDocumentDto.source = sourceUrl;

        const regulationDocument = regulationDocumentMapper.createModelFromDto(regulationDocumentDto);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        const { _id, ...documentChangeSet } = (regulationDocument as any)._doc;
        await RegulationDocumentModel.findOneAndUpdate({ source: sourceUrl }, documentChangeSet, { upsert: true });

        res
            .status(200)
            .json({
                status: 'ok',
                operation: 'write',
            });
    } catch (e) {
        console.error(e);

        res
            .status(500)
            .json({
                status: 'error',
                error: e,
            });
    }
});

export default router;
