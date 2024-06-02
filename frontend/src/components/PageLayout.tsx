import { JSX } from 'react';
import DocumentsList from './DocumentsList';
import S3DocumentPreview from './S3DocumentPreview';
import ApiDocumentPreview from './ApiDocumentPreview';

const PageLayout = (): JSX.Element => (
  <div>
    <h1>Regulation Documents</h1>

    <h2>Documents List</h2>
    <DocumentsList />

    <h3>Preview Document from S3</h3>
    <S3DocumentPreview />

    <h3>Preview Document from API</h3>
    <ApiDocumentPreview />
  </div>
);

export default PageLayout;
