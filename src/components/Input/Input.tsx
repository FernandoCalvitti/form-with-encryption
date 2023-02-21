import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import AttachFileIcon from "@mui/icons-material/AttachFile";

type Props = {
  placeholder: string;
  input: any;
  label: string;
  id: string;
  value: string;
  handleChange: any;
  error: string | null;
  helperText: string | null;
};

const Input: React.FC<Props> = (props) => {
  const {
    placeholder,
    label,
    id,
    value,
    error,
    handleChange,
    helperText,
    ...input
  } = props;

  const isDateInput = label === "Company Creation Date" || label === "Birth";

  return (
    <Box m={4}>
      {label !== "Files" ? (
        <TextField
          label={label}
          {...input}
          onChange={handleChange}
          variant={"outlined"}
          error={!!error}
          helperText={!!error ? helperText : ""}
          InputLabelProps={isDateInput ? { shrink: true } : {}}
          sx={isDateInput ? { maxWidth: "100%", width: "236px" } : {}}
        />
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          justifyContent="center"
        >
          <Button
            size="large"
            variant="contained"
            component="label"
            endIcon={<AttachFileIcon />}
            sx={{
              maxWidth: "100%",
              width: "236px",
              height: "56px",
              background:
                "linear-gradient(90deg, rgba(106,103,164,1) 0%, rgba(0,84,101,1) 100%)",
            }}
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
