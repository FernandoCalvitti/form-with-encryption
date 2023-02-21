import { useState, useEffect } from "react";
import { encryptFormData } from "../app/reducers/form/formSlice";
import { useStore } from "react-redux";
import axios from "axios";
import encryptFiles from "../helpers/encryptFiles";
import { URL } from "../config/Routes";

const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const { getState, dispatch } = useStore<any>();

  useEffect(() => {
    const sendRequest = async () => {
      setLoading(true);
      try {
        const response = await axios.post(URL, formData);
        setData(response.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    if (formData) {
      sendRequest();
    }
  }, [formData]);

  const handleSubmit = async (
    event: React.FormEvent,
    form: any,
    files: File[],
    secretKey: string
  ) => {
    event.preventDefault();
    const filesEncrypted = await encryptFiles(files, secretKey);
    const state = getState();
    const formData = new FormData();

    dispatch(
      encryptFormData({
        form: form,
        key: secretKey,
        files: filesEncrypted,
      })
    );

    state.form.encryptFormData.forEach(
      (encryptedData: string, index: number) => {
        formData.append(`${encryptedData}_${index}`, encryptedData);
      }
    );

    setFormData(formData);
  };

  return { loading, error, data, handleSubmit };
};

export default useHttp;
