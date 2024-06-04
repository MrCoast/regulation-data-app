import { RegulationDocument } from '../types/document';

export type RegulationDocumentInfo = {
  id: string;
  title: string;
  source: string;
};

export async function listDocuments(): Promise<RegulationDocumentInfo[]> {
  // Normally this should come from web-api GET /documents endpoint,
  // which is a trivial list endpoint - so just saving some time here
  return [
    {
      id: 'title-49',
      title: 'Title 49 :: Transportation 123',
      source: 'https://www.ecfr.gov/api/renderer/v1/content/enhanced/2024-03-01/title-49',
    },
  ];
}

function getS3KeyByDocumentSource(documentSource: string) {
  const sanitizedUrl = documentSource.split(/[^\w-]/).filter(Boolean).join('_').slice(0, 20);

  return btoa(sanitizedUrl);
}

export async function loadDocumentFromS3(documentSource: string): Promise<RegulationDocument> {
  // Alternatively, signed temporary S3 URLs might be used, that involves a back end endpoint implementation with aws-sdk.
  // Here the direct s3 URLs are used to save development time.
  const s3Url = `https://mancomm-regulation-documents.s3.us-west-2.amazonaws.com/${getS3KeyByDocumentSource(documentSource)}`;
  console.log(`S3: Loading documentSource = "${documentSource}", s3Url = ${s3Url}`);

  try {
    const s3Response = await fetch(s3Url);
    const content = await s3Response.json();

    return content as RegulationDocument;
  } catch (e) {
    console.error(`S3: Error loading document by source: "${documentSource}"`);
  }

  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loadDocumentFromApi(documentId: string, fieldPath?: any) {
  const apiBaseUrl = 'http://localhost:11020';
  const fieldPathString = fieldPath ? JSON.stringify(fieldPath) : '';
  const apiUrl = `${apiBaseUrl}/api/document/${documentId}`;
  const params = new URLSearchParams({
    fieldPath: fieldPathString,
  });

  try {
    const apiResponse = await fetch(`${apiUrl}?${params.toString()}`);
    const content = await apiResponse.json();

    return content.data;
  } catch (e) {
    console.error(`API: Error loading document: id = "${documentId}", fieldPath = ${fieldPathString}`);
  }

  return null;
}
