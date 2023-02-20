import { Button, Stack, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../app/reducers/form/formSlice";
import { inputs } from "../../constants/constants";
import FilesList from "../FilesList";
import Input from "../Input";
import { SECRET_KEY } from "../../constants/constants";
import useHttp from "../../hooks/useHttp";
import { Box } from "@mui/system";
import SaveIcon from "@mui/icons-material/Save";

type Props = {};

const Form = (props: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const stateFromStore = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const { loading, error, data, handleSubmit } = useHttp();

  const handleFormValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const value = event.target.value;
      console.log("nombre del campo: " + name);

      let error: string | null = null;

      switch (name) {
        case "firstName":
        case "lastName":
        case "address":
        case "zip":
        case "city":
        case "state":
        case "companyName":
        case "companyAddress":
        case "companyCity":
        case "companyState":
        case "companyZip":
          if (value.trim() === "") {
            error = "Required field!";
          }
      }
      setErrors((errors) => ({ ...errors, [name]: error }));

      dispatch(updateField({ name, value }));
    },
    [dispatch]
  );

  const handleUploadFiles = useCallback(
    (filesToUpload: any) => {
      const uploaded = [...files];
      filesToUpload.some((file: any) => {
        if (uploaded.findIndex((f: any) => f.name === file.name) === -1) {
          uploaded.push(file);
        }
      });
      setFiles(uploaded);
    },
    [files]
  );

  const handleFileEvent = useCallback(
    (e: any) => {
      e.preventDefault();
      const filesSelected = Array.prototype.slice.call(e.target.files);
      handleUploadFiles(filesSelected);
    },
    [handleUploadFiles]
  );

  const handleRemoveFile = (filename: string) => {
    setFiles((prevFiles: any) => {
      return prevFiles.filter((file: File) => file.name !== filename);
    });
  };

  return (
    <Box
      component={"main"}
      m={"4rem"}
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      alignItems={"center"}
    >
      <form
        style={{
          margin: "2rem",
          border: "1px solid grey",
          borderRadius: "2rem",
        }}
      >
        <Stack
          sx={{
            boxShadow: 3,
            borderTopLeftRadius: "2rem",
            borderTopRightRadius: "2rem",
            padding: "1rem",
            background:
              "linear-gradient(90deg, rgba(106,103,164,1) 0%, rgba(0,84,101,1) 100%)",
            color: "white",
          }}
        >
          <Typography variant="h1" fontSize={36} m={"1rem"}>
            Welcome to Random Inc.
          </Typography>
          <Typography variant="h2" fontSize={16}>
            Complete the form, (*) fields are required.
          </Typography>
        </Stack>
        {inputs.map((input: any) => (
          <Input
            key={input.id}
            value={stateFromStore[input.name]}
            handleChange={
              input.name !== "files" ? handleFormValueChange : handleFileEvent
            }
            error={!!errors[input.name] || undefined}
            helperText={errors[input.name] || null}
            {...input}
          />
        ))}
        <FilesList files={files} handlerRemove={handleRemoveFile} />
        <Button
          size="large"
          variant="contained"
          endIcon={<SaveIcon />}
          sx={{
            maxWidth: "100%",
            width: "236px",
            height: "56px",
            background:
              "linear-gradient(90deg, rgba(106,103,164,1) 0%, rgba(0,84,101,1) 100%)",
            marginBottom: "2rem",
          }}
          onClick={(e) => handleSubmit(e, stateFromStore, files, SECRET_KEY)}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Form;
