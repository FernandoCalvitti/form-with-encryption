import React from "react";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = { files: File[]; handlerRemove: (name: string) => void };

const FilesList: React.FC<Props> = ({ files, handlerRemove }) => {
  return (
    <List
      sx={{
        width: "100%",
        minWidth: "64px",
        margin: "1rem auto",
      }}
    >
      {files.map((file: any, index) => {
        const { name, loading } = file;
        return (
          <ListItem
            sx={{
              maxWidth: "500px",
              minWidth: "64px",
              margin: "1rem auto",
              width: "80%",
              padding: "0 8px ",
            }}
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
                <CheckCircleRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{
                fontSize: "12px",
                overflow: "hidden",
                maxWidth: "60%",
              }}
            >
              {name}
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
};

export default FilesList;
