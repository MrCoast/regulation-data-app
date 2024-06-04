import { JSX, useContext, useEffect, useState } from 'react';
import { DocumentContext, DocumentContextValue } from '../contexts/document';
import { RegulationDocumentInfo, loadDocumentFromApi } from '../utils/document';
import RegulationDocumentView from './document/regulation-document';
import { RegulationDocument } from '../types/document';
import LazyPartialLoadDecorator from '../decorators/LazyPartialLoadDecorator';

const ApiDocumentPreview = (): JSX.Element => {
  const { selectedDocument: selectedDocumentInfo } = useContext<DocumentContextValue<RegulationDocumentInfo>>(DocumentContext);
  const [document, setDocument] = useState<RegulationDocument>(null);

  useEffect(() => {
    (async () => {
      if (selectedDocumentInfo) {
        setDocument(await loadDocumentFromApi(selectedDocumentInfo.id));
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
    <LazyPartialLoadDecorator>
      <RegulationDocumentView document={document} />
    </LazyPartialLoadDecorator>
  );
};

export default ApiDocumentPreview;
