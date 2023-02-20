import { Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../app/reducers/form/formSlice";
import { inputs } from "../../constants/constants";
import FilesList from "../FilesList";
import Input from "../Input";
import { SECRET_KEY } from "../../constants/constants";
import useHttp from "../../hooks/useHttp";

type Props = {};

const Form = (props: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const stateFromStore = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const { loading, error, data, handleSubmit } = useHttp();

  const handleFormValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const value = event.target.value;
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
    <form>
      {inputs.map((input: any) => (
        <Input
          key={input.id}
          value={stateFromStore[input.name]}
          handleChange={
            input.name !== "files" ? handleFormValueChange : handleFileEvent
          }
          {...input}
        />
      ))}
      <FilesList files={files} handlerRemove={handleRemoveFile} />
      <Button
        sx={{
          m: 4,
          p: 4,
        }}
        variant="contained"
        onClick={(e) => handleSubmit(e, stateFromStore, files, SECRET_KEY)}
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
