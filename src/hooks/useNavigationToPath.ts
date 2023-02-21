import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useNavigationToPath = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNavigateToPath = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 2500);
  };

  return {
    handleNavigateToPath,
    loading,
    setLoading,
  };
};

export default useNavigationToPath;
