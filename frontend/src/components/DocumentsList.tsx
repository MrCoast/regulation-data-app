import { JSX, useContext, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import FileOpen from '@mui/icons-material/FileOpen';
import styled from '@emotion/styled';
import { listDocuments, RegulationDocumentInfo } from '../utils/document';
import { DocumentContext } from '../contexts/document';

const StyledListItemButton = styled(ListItemButton)`
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  max-width: 200px;
  margin-right: 20px;
  justify-content: center;
`;

const renderListItems = (documents: RegulationDocumentInfo[], handleDocumentClick) => (
  documents.map((document) => (
    <ListItem key={document.id}>
      <ListItemAvatar>
        <Avatar>
          <FileOpen />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={document.title} secondary={document.source} />
      <StyledListItemButton onClick={() => handleDocumentClick(document)}>
        Preview Document
      </StyledListItemButton>
    </ListItem>
  ))
)

const DocumentsList = (): JSX.Element => {
  const [documents, setDocuments] = useState<RegulationDocumentInfo[]>([]);
  const { handleDocumentClick } = useContext(DocumentContext);

  useEffect(() => {
    (async () => {
      setDocuments(await listDocuments());
    })();
  }, []);

  return (
    <List>
      {renderListItems(documents, handleDocumentClick)}
    </List>
  );
};

export default DocumentsList;
