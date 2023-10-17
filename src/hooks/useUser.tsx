import { useEffect, useState } from "react";
import { getUserInfo } from "../api/api";
import { User } from "../interafaces";
import { useToken } from "./useToken";

export const useUser = () => {
  const { token, saveToken } = useToken();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!!token) {
      setLoading(true);

      getUserInfo(token)
        .then((user) => {
          setUser(user);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setUser(null);
          saveToken(null);
        });
    } else {
      setUser(null);
    }
  }, [token, saveToken]);

  return { user, loading, token, saveToken };
};

export default useUser;
