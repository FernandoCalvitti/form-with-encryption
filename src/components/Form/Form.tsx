import { Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setNewFormData } from "../../app/reducers/form/formSlice";
import { initialData, inputs } from "../../constants/constants";
import { FormDataI } from "../../Types/FormData";
import Input from "../Input";

type Props = {};

const Form = (props: Props) => {
  const [formData, setFormData] = useState<FormDataI>(initialData);
  const [files, setFiles] = useState<FormData[]>([]);

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

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    const formattedFile = formatFile(file);
    setFiles([...files, formattedFile]);
    console.log(files);
  };

  const formatFile = (file: File) => {
    const data = new FormData();
    data.append(file.name, file, file.name);
    return data;
  };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setNewFormData(formData as any));
  };

  console.log(formData);
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
      <Button onClick={() => handleSubmit()}>Almacenar en redux</Button>
    </form>
  );
};

export default Form;
