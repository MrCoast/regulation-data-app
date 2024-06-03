import { JSX, useContext, useEffect, useState } from 'react';
import { DocumentContext, DocumentContextValue } from '../contexts/document';
import { RegulationDocumentInfo, loadDocumentFromS3 } from '../utils/document';
import RegulationDocumentView from './document/regulation-document';
import { RegulationDocument } from '../types/document';

const S3DocumentPreview = (): JSX.Element => {
  const { selectedDocument: selectedDocumentInfo } = useContext<DocumentContextValue<RegulationDocumentInfo>>(DocumentContext);
  const [document, setDocument] = useState<RegulationDocument>(null);

  useEffect(() => {
    (async () => {
      if (selectedDocumentInfo) {
        setDocument(await loadDocumentFromS3(selectedDocumentInfo.source));
      }
    })();
  }, [selectedDocumentInfo]);

  if (!selectedDocumentInfo || !document) {
    return (
      <div>
        No document selected
      </div>
    );
  }

  return (
    <>
      <RegulationDocumentView document={document} />
    </>
  );
};

export default S3DocumentPreview;
