import { useEffect, useState } from "react";
import { Pomodoro } from "../interafaces";

interface StoragePomodoro {
  finished: string;
  duration: number;
}

export function usePomodoros() {
  const localPomodoros = localStorage.getItem("pomodoros");

  const [pomodoros, setPomo] = useState<Pomodoro[]>(() => {
    if (localPomodoros) {
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
      return pomos;
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const setPomodoros = (newPomodoros: Pomodoro[]) => {
    setPomo(newPomodoros);
    localStorage.setItem("pomodoros", JSON.stringify(newPomodoros));
  };

  return {
    isLoading,
    pomodoros,
    setPomodoros,
  };
}

export default usePomodoros;
