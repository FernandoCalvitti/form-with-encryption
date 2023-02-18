import { Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setNewFormData } from "../../app/reducers/form/formSlice";
import { initialData, inputs } from "../../constants/constants";
import { FormDataI } from "../../Types/FormData";
import FilesList from "../FilesList";
import Input from "../Input";

type Props = {};

const Form = (props: Props) => {
  const [formData, setFormData] = useState<FormDataI>(initialData);
  const [files, setFiles] = useState<File[]>([]);

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

  const handleFileUpload = useCallback(
    (e: any) => {
      e.preventDefault();
      const file = e.target.files[0];
      /*  const formattedFile = formatFile(file); */ // Para formatear files
      const repeated = files.some((item) => item.name === file.name);
      if (repeated) {
        return;
      } else {
        setFiles((prevFiles: any) => {
          return [...prevFiles, file];
        });
      }
    },
    [files]
  );

  const formatFile = (file: File) => {
    const data = new FormData();
    data.append(file.name, file, file.name);
    return data;
  };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setNewFormData(formData as any));
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
          value={formData[input.name as keyof typeof initialData]}
          handleChange={
            input.name !== "files" ? handleFormValueChange : handleFileUpload
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
