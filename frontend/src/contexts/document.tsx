import { createContext, useState } from 'react';
import { RegulationDocumentInfo } from '../utils/document';

export interface DocumentContextValue<T> {
  selectedDocument: T | null;
  handleDocumentClick: (document: T) => void;
}

const DocumentContext = createContext<DocumentContextValue<RegulationDocumentInfo>>(null);

const DocumentProvider = ({ children }) => {
  const [selectedDocument, setSelectedDocument] = useState<RegulationDocumentInfo>(null);

  const handleDocumentClick = (document: RegulationDocumentInfo) => {
    setSelectedDocument(document);
  };

  return (
    <DocumentContext.Provider value={{ selectedDocument, handleDocumentClick }}>
      {children}
    </DocumentContext.Provider>
  );
};

export { DocumentContext, DocumentProvider };
