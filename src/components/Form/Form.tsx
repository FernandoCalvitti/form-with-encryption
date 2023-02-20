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
import { SECRET_KEY, URL } from "../../constants/constants";

type Props = {};

const Form = (props: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const stateFromStore = useSelector((state: any) => state);
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

  const handleSubmit = async () => {
    const filesEncrypted = await encryptFiles(files, SECRET_KEY);

    dispatch(
      encryptFormData({
        form: stateFromStore,
        key: SECRET_KEY,
        files: filesEncrypted,
      })
    );

    const state = store.getState();
    const data = new FormData();

    state.form.encryptFormData.forEach(
      (encryptedData: string, index: number) => {
        data.append(`${encryptedData}_${index}`, encryptedData);
      }
    );

    const BODY = data;

    try {
      const response = await axios.post(URL, BODY);
      /* console.log("response: ", response); */
    } catch (error) {
      console.log(error);
    }
  };

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
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
