import { JSX } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import FileOpen from '@mui/icons-material/FileOpen';
import styled from '@emotion/styled';

const StyledListItemButton = styled(ListItemButton)`
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const renderListItems = () => {
  const documents = [
    {
      title: 'Title 49 :: Transportation',
      source: 'https://www.ecfr.gov/current/title-49',
    },
    {
      title: 'Title 50 :: Wildlife and Fisheries',
      source: 'https://www.ecfr.gov/current/title-50',
    }
  ];

  return documents.map((document) => (
    <ListItem >
      <ListItemAvatar>
        <Avatar>
          <FileOpen />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={document.title} secondary={document.source} />
      <StyledListItemButton>Preview from S3</StyledListItemButton>
      <StyledListItemButton>Preview from API</StyledListItemButton>
    </ListItem>
  ));
}

const DocumentsList = (): JSX.Element => (
  <List>
    {renderListItems()}
  </List>
);

export default DocumentsList;
