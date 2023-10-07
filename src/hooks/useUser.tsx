import { useMemo, useState } from "react";
import { getUserInfo } from "../api/api";
import { User } from "../interafaces";
import { useToken } from "./useToken";

export const useUser = () => {
  const { token, saveToken } = useToken();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useMemo(() => {
    if (!!token) {
      setLoading(true);

      getUserInfo(token)
        .then((user) => {
          setUser(user);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error on getUserInfo", err);
          setLoading(false);
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, [token]);

  return { user, loading, token, saveToken };
};

export default useUser;
