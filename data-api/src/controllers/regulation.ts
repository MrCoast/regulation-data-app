import express, { Request, Response } from 'express';
import * as regulationService from '../services/regulation';

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

        // @TODO: OpenAPI annotations could be leveraged instead as a smarter validation and responses typing approach
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
        res
            .status(500)
            .json({
                status: 'error',
                error: e,
            });
    }
});

export default router;
