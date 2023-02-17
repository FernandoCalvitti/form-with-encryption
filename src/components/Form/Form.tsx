import React, { useCallback, useState } from "react";
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

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    </form>
  );
};

export default Form;
