export type RegulationDocumentInfo = {
  id: string;
  title: string;
  source: string;
};

export async function listDocuments(): Promise<RegulationDocumentInfo[]> {
    return [
      {
        id: 'title-49',
        title: 'Title 49 :: Transportation 123',
        source: 'https://www.ecfr.gov/current/title-49',
      },
      {
        id: 'title-50',
        title: 'Title 50 :: Wildlife and Fisheries',
        source: 'https://www.ecfr.gov/current/title-50',
      },
    ];
}

export async function loadDocumentFromS3(documentId) {

}

export async function loadDocumentFromApi(documentId) {

}
