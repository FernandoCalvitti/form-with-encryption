import { Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setNewFormData } from "../../app/reducers/form/formSlice";
import { initialData, inputs } from "../../constants/constants";
import { FormData } from "../../Types/FormData";
import Input from "../Input";

type Props = {};

const Form = (props: Props) => {
  const [formData, setFormData] = useState<FormData>(initialData);

  const updateValueCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.persist();
      setFormData((prevFormData: any) => {
        let fieldId = event.target.name;
        if (fieldId === "files") {
          if (!event.target.files) {
            return;
          }
          const newFile = event.target.files[0];
          return { ...prevFormData, files: [...prevFormData.files, newFile] };
        } else {
          return {
            ...prevFormData,
            [fieldId]: event.target.value,
          };
        }
      });
    },
    []
  );

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
          handleChange={updateValueCallback}
          {...input}
        />
      ))}
      <Button onClick={() => handleSubmit()}>Almacenar en redux</Button>
    </form>
  );
};

export default Form;
