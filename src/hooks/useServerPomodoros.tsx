import { useEffect, useState } from "react";
import { addPomodoroToServer, getPomodoros } from "../api/api";
import { Pomodoro } from "../interafaces";
import { useAuth } from "./useAuth";

const useServerPomodoros = () => {
  const { user, loading: authLoading, token } = useAuth();
  const [pomodoros, setPomodoros] = useState<Pomodoro[]>([]);
  const [loading, setLoading] = useState(false);

  const addPomodoro = (pomodoro: Pomodoro) => {
    if (user && token) {
      addPomodoroToServer(token, pomodoro).then((data) => {
        setPomodoros([...pomodoros, data]);
      });
    }
  };

  useEffect(() => {
    if (!authLoading && token) {
      setLoading(true);
      getPomodoros(token)
        .then((data) => {
          setPomodoros(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);

          setLoading(false);
        });
    }
  }, [authLoading, token]);

  return {
    pomodoros,
    addPomodoro,
    loading: authLoading || loading,
  };
};

export default useServerPomodoros;
