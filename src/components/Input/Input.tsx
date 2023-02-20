import { Box, Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";

type Props = {
  placeholder: string;
  input: any;
  label: string;
  id: string;
  value: string;
  handleChange: any;
};

const Input: React.FC<Props> = (props) => {
  const { placeholder, label, id, value, handleChange, ...input } = props;

  return (
    <Box m={4}>
      {label !== "Files" ? (
        <TextField
          label={label}
          {...input}
          onChange={handleChange}
          variant={"outlined"}
        />
      ) : (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            size="large"
            variant="contained"
            component="label"
            endIcon={<AttachFileIcon />}
          >
            Upload Files
            <input onChange={handleChange} hidden multiple type="file" />
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default React.memo(Input);
