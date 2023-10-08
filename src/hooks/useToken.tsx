import { useCallback, useState } from "react";

export const useToken = () => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  const saveToken = useCallback(
    (token: string | null) => {
      setToken(token);
      if (token === null) {
        localStorage.removeItem("token");
      } else {
        localStorage.setItem("token", token);
      }
    },
    [setToken],
  );

  return { token, saveToken };
};
