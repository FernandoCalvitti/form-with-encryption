import { Box, TextField } from "@mui/material";
import React from "react";

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
      <TextField
        label={label}
        {...input}
        onChange={handleChange}
        variant={"outlined"}
        inputProps={label === "Files" ? { multiple: true } : {}}
      />
    </Box>
  );
};

export default React.memo(Input);
