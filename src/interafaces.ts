export interface WorkerCommand {
  command: string;
  intervalId?: NodeJS.Timer;
  timeout?: number;
  time?: Date;
}

export interface Pomodoro {
  duration: number;
  finished: Date;
}

export interface User {
  id: string;
  email: string;
}
