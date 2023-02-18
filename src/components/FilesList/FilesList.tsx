import React from "react";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = { files: File[]; handlerRemove: (name: string) => void };

const FilesList: React.FC<Props> = ({ files, handlerRemove }) => {
  return (
    <List>
      {files.map((file: any, index) => {
        const { name, loading } = file;
        return (
          <ListItem
            key={`${index}${name}`}
            secondaryAction={
              <IconButton
                onClick={() => handlerRemove(name)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>{name}</ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
};

export default FilesList;
