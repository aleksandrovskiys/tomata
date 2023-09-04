export interface WorkerCommand {
  command: string;
  intervalId?: NodeJS.Timer;
  timeout?: number;
  time?: Date;
}

export interface Pomidor {
  duration: number;
  finished: Date;
}
