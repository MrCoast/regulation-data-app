import express, { Request, Response } from 'express';
import * as documentService from '../services/document';

const router = express.Router();

router.get('/', async (req, res) => {
    res
        .status(200)
        .send('Welcome to API controller!');
});

router.get('/documents', async (req, res) => {
    res
        .status(200)
        .send('Welcome to API controller!');
});

type DocumentRequest = Request<
    { id: string },
    unknown,
    unknown,
    { fieldPath?: string }
>;

router.get('/document/:id', async (req: DocumentRequest, res: Response) => {
    const id = req.params.id;
    const fieldPath = req.query.fieldPath;

    const documentData = await documentService.getDocumentData(id, fieldPath);

    res
        .status(200)
        .json({
            status: 'ok',
            data: documentData,
        });
});

export default router;
