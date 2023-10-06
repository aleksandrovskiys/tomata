import { useState } from "react";

export const useToken = () => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  const saveToken = (token: string | null) => {
    setToken(token);
    if (token === null) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", token);
    }
  };

  return { token, saveToken };
};
