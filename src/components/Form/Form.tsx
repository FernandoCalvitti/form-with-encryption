import { Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  encryptFormData,
  updateField,
} from "../../app/reducers/form/formSlice";
import { inputs } from "../../constants/constants";
import FilesList from "../FilesList";
import Input from "../Input";
import axios from "axios";
import encryptFiles from "../../helpers/encryptFiles";
import store from "../../app/store";

type Props = {};

const Form = (props: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const stateFromStore = useSelector((state: any) => state);
  const dataEncrypted = useSelector((state: any) => state.form.encryptFormData);
  const dispatch = useDispatch();

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

  const handleSubmit = () => {
    sendDataToServer();
  };

  const handleRemoveFile = (filename: string) => {
    setFiles((prevFiles: any) => {
      return prevFiles.filter((file: File) => file.name !== filename);
    });
  };

  const sendDataToServer = async () => {
    const URL = "https://v2.convertapi.com/upload";

    const key = "Clave";
    const filesEncrypted = await encryptFiles(files, key);

    dispatch(
      encryptFormData({
        form: stateFromStore,
        key,
        files: filesEncrypted,
      })
    );

    const state = store.getState();
    const data = new FormData();
    dataEncrypted.forEach((encryptedData: string, index: number) => {
      data.append(`${encryptedData}_${index}`, encryptedData);
    });
    const BODY = data;

    console.log("la data encryptada: ", state.form.encryptFormData);
    try {
      const response = await axios.post(URL, BODY);
      /* console.log("response: ", response); */
    } catch (error) {
      console.log(error);
    }
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
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
