import express, { Request, Response } from 'express';
import * as regulationService from '../services/regulation';
import * as regulationDocumentMapper from '../mappers/regulation-document';
import { RegulationDocument as RegulationDocumentModel } from '../models/regulation-document';

const router = express.Router();

router.get('/', (req, res) => {
    res
        .status(200)
        .send('Welcome to Regulation controller!');
});

interface GetRegulationQuery {
    sourceUrl: string;
}

router.get('/preload', async (req: Request<GetRegulationQuery>, res: Response) => {
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

router.get('/save', async (req: Request<GetRegulationQuery>, res: Response) => {
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
