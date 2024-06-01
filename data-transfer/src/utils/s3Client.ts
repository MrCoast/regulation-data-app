import { S3 } from 'aws-sdk';

export default class S3Client {
    private static instance: S3Client | null = null;
    private s3: S3;

    private constructor(awsRegion: string) {
        this.s3 = new S3({
            apiVersion: '2006-03-01',
            region: awsRegion,
        });
    }

    public static getInstance(awsRegion: string): S3Client {
        if (!S3Client.instance) {
            S3Client.instance = new S3Client(awsRegion);
        }

        return S3Client.instance;
    }

    public getClient() {
        return this.s3;
    }
}
