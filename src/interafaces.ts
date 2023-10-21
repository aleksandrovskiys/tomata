export interface WorkerCommand {
  command: string;
  intervalId?: NodeJS.Timer;
  timeout?: number;
  time?: Date;
}

export interface Pomodoro {
  duration: number;
  finished: Date;
  id?: number;
  task?: string;
}

export interface User {
  id: string;
  email: string;
}

export interface AntiForgeryTokenResponse {
  state: string;
}
