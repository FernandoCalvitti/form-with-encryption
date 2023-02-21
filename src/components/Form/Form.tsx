import { Button, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
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
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const { getState, dispatch } = useStore<any>();
  const { loading, error, data, handleSubmit } = useHttp();

  const stateFromStore = getState();

  const requiredFields = inputs.filter((input) => input.required === true);
  const checkRequiredFormValues = () => {
    let allFieldsComplete = true;
    for (const field of requiredFields) {
      if (field.required) {
        const fieldName = field.name;
        if (!stateFromStore.form.formData[fieldName]) {
          allFieldsComplete = false;
        }
      }
    }
    setCanSubmit(allFieldsComplete);
  };

  const handleFormValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const value = event.target.value;
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

  useEffect(() => {
    checkRequiredFormValues();
  }, [stateFromStore.form.formData]);

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
          borderRadius: "2rem",
          boxShadow: "10px 10px 20px 3px rgba(0,67,166,0.75)",
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
          disabled={!canSubmit ? true : false}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Form;
