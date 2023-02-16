import React, { useState } from "react";
import { initialData, inputs } from "../../constants/constants";
import { FormData } from "../../Types/FormData";
import Input from "../Input";

type Props = {};

const Form = (props: Props) => {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

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
          handleChange={handleChange}
          {...input}
        />
      ))}
    </form>
  );
};

export default Form;
