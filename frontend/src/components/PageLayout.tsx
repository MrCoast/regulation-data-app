import { JSX } from 'react';
import styled from '@emotion/styled';
import DocumentsList from './DocumentsList';
import S3DocumentPreview from './S3DocumentPreview';
import ApiDocumentPreview from './ApiDocumentPreview';
import { DocumentProvider } from '../contexts/document';

const LayoutWrapper = styled.div`
  margin-left: 20px;
  max-width: 1200px;

  .darker-heading {
    color: #a6a6a6;
  }
`;

const PageLayout = (): JSX.Element => (
  <LayoutWrapper>
    <h1>Regulation Documents</h1>

    <DocumentProvider>
      <h2 className='darker-heading'>Documents List</h2>
      <DocumentsList />

      <h3 className='darker-heading'>Preview Document from S3</h3>
      <S3DocumentPreview />

      <h3 className='darker-heading'>Preview Document from API</h3>
      <ApiDocumentPreview />
    </DocumentProvider>
  </LayoutWrapper>
);

export default PageLayout;
