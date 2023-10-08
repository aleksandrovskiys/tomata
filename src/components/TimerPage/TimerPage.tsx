import "./TimerPage.css";
import AppContainer from "../common/AppContainer/AppContainer";
import usePomodoros from "../../hooks/usePomodoros";
import Loader from "../common/Loader/Loader";
import Timer from "./Timer";
import PomodoroList from "./PomodoroList";

function TimerPage() {
  const {
    pomodoros,
    addPomodoro,
    isLoading: pomodorosIsLoading,
  } = usePomodoros();

  if (pomodorosIsLoading) {
    return <Loader />;
  }

  return (
    <AppContainer>
      <Timer addPomodoro={addPomodoro} />
      <PomodoroList
        pomodoros={pomodoros.sort((a, b) => (a.finished > b.finished ? -1 : 1))}
      />
    </AppContainer>
  );
}

export default TimerPage;
