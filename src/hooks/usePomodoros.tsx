import { useEffect, useState } from "react";
import { Pomodoro } from "../interafaces";
import { useAuth } from "./useAuth";
import useServerPomodoros from "./useServerPomodoros";

interface StoragePomodoro {
  finished: string;
  duration: number;
}

export function usePomodoros() {
  const {
    pomodoros: serverPomodoros,
    loading,
    addPomodoro: addPomodoroToServer,
  } = useServerPomodoros();
  const { user } = useAuth();

  const localPomodoros = localStorage.getItem("pomodoros");

  const [pomodoros, setPomo] = useState<Pomodoro[]>([]);

  useEffect(() => {
    if (!user && localPomodoros && !loading) {
      const pomos = JSON.parse(localPomodoros)
        .map((pomodoro: StoragePomodoro) => {
          return {
            ...pomodoro,
            finished: new Date(pomodoro.finished),
          };
        })
        .filter(
          (pomodoro: Pomodoro) =>
            new Date(pomodoro.finished).setHours(0, 0, 0, 0) ===
            new Date().setHours(0, 0, 0, 0),
        );
      setPomo(pomos);
    } else if (user && !loading) {
      setPomo(serverPomodoros);
    }
  }, [user, loading, serverPomodoros, localPomodoros]);

  const setPomodoros = (newPomodoros: Pomodoro[]) => {
    setPomo(newPomodoros);
    localStorage.setItem("pomodoros", JSON.stringify(newPomodoros));
  };

  const clearPomodoros = () => {
    setPomo([]);
    localStorage.setItem("pomodoros", JSON.stringify([]));
  };

  const addPomodoro = (pomodoro: Pomodoro) => {
    if (user) {
      addPomodoroToServer(pomodoro);
    } else {
      const newPomodoros = [...pomodoros, pomodoro];
      setPomodoros(newPomodoros);
    }
  };

  return {
    isLoading: false,
    pomodoros,
    clearPomodoros,
    addPomodoro,
  };
}

export default usePomodoros;
