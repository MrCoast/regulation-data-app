import express, { Request, Response } from 'express';
import * as regulationService from '../services/regulation';
import * as regulationDocumentMapper from '../mappers/regulation-document';

const router = express.Router();

router.get('/', (req, res) => {
    res
        .status(200)
        .send('Welcome to Regulation controller!');
});

interface GetRegulationQuery {
    sourceUrl: string;
}

router.get('/get-regulation', async (req: Request<GetRegulationQuery>, res: Response) => {
    try {
        const sourceUrl = req.query.sourceUrl;

        // @TODO: OpenAPI annotations could be leveraged instead - as a smarter validation and responses typing approach
        if (!sourceUrl) {
            res
                .status(400)
                .json({
                    status: 'error',
                    error: 'sourceUrl parameter is required',
                });

            return;
        }

        const regulationDocument = await regulationService.getRegulationDocumentFromUrl(sourceUrl as string);

        res
            .status(200)
            .json({
                status: 'ok',
                regulationDocument,
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

router.get('/save-regulation', async (req: Request<GetRegulationQuery>, res: Response) => {
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

        const regulationDocument = await regulationService.getRegulationDocumentFromUrl(sourceUrl as string);
        const regulationDocumentModel = regulationDocumentMapper.createModelFromDto(regulationDocument);
        await regulationDocumentModel.save();

        res
            .status(200)
            .json({
                status: 'ok',
                regulationDocument,
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
