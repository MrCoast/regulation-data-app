import { JSX, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import FileOpen from '@mui/icons-material/FileOpen';
import styled from '@emotion/styled';
import { listDocuments, RegulationDocumentInfo } from '../utils/document';

const StyledListItemButton = styled(ListItemButton)`
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  max-width: 200px;
  margin-right: 20px;
  justify-content: center;
`;

const renderListItems = (documents: RegulationDocumentInfo[]) => (
  documents.map((document) => (
    <ListItem key={document.id}>
      <ListItemAvatar>
        <Avatar>
          <FileOpen />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={document.title} secondary={document.source} />
      <StyledListItemButton>Preview from S3</StyledListItemButton>
      <StyledListItemButton>Preview from API</StyledListItemButton>
    </ListItem>
  ))
)

const DocumentsList = (): JSX.Element => {
  const [documents, setDocuments] = useState<RegulationDocumentInfo[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setDocuments(await listDocuments());
    };

    loadData();
  }, []);

  return (
    <List>
      {renderListItems(documents)}
    </List>
  );
};

export default DocumentsList;
