import { Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewFormData } from "../../app/reducers/form/formSlice";
import { initialData, inputs } from "../../constants/constants";
import { FormDataI } from "../../Types/FormData";
import FilesList from "../FilesList";
import Input from "../Input";
import axios from "axios";

type Props = {};

const Form = (props: Props) => {
  const [formData, setFormData] = useState<FormDataI>(initialData);
  const [files, setFiles] = useState<File[]>([]);
  const stateFromStore = useSelector((state: any) => state.form.formData);

  const handleFormValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.persist();
      setFormData((prevFormData: any) => {
        let fieldId = event.target.name;

        return {
          ...prevFormData,
          [fieldId]: event.target.value,
        };
      });
    },
    []
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

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setNewFormData(formData as any));
    sendDataToServer();
  };

  const handleRemoveFile = (filename: string) => {
    setFiles((prevFiles: any) => {
      return prevFiles.filter((file: File) => file.name !== filename);
    });
  };

  const sendDataToServer = async () => {
    const URL = "https://v2.convertapi.com/upload";

    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append(files[i].name, files[i]);
    }

    const BODY = {
      files: [...data],
      formData: { ...stateFromStore },
    };

    try {
      const response = await axios.post(URL, BODY);
      console.log("response: ", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      {inputs.map((input: any) => (
        <Input
          key={input.id}
          value={formData[input.name as keyof typeof initialData]}
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
