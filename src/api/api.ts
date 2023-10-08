import { LoginInputs } from "../components/LoginPage/LoginForm";
import { Pomodoro, User } from "../interafaces";

const API_URL = process.env.REACT_APP_API_URL;

interface RegisterParameters {
  email: string;
  password: string;
}

interface BasicResponse {
  message?: string;
}

interface UserInfo extends BasicResponse {
  user: User;
}

interface LoginResponse extends BasicResponse {
  token: string;
}

export async function register(
  parameters: RegisterParameters,
): Promise<UserInfo> {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    body: JSON.stringify(parameters),
  }).catch((err) => console.log(err));

  if (!response) {
    const error = new Error("Can't connect to server");
    return Promise.reject(error);
  }

  const { user, message } = await response.json();

  if (response.ok) {
    return Promise.resolve(user);
  } else {
    const error = new Error(message);
    return Promise.reject(error);
  }
}

export async function login(parameters: LoginInputs): Promise<LoginResponse> {
  const response = fetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify(parameters),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject("Unsuccessful request");
      }
      return res.json();
    })
    .then((data: LoginResponse) => {
      return Promise.resolve(data);
    })
    .catch(() => {
      return Promise.reject("Service unavailable");
    });

  return response;
}

export async function getUserInfo(token: string): Promise<User> {
  const response = fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject("Unsuccessful request");
      }
      return res.json();
    })
    .then((data: UserInfo) => {
      return Promise.resolve(data.user);
    });
  return response;
}

export async function getPomodoros(token: string): Promise<Pomodoro[]> {
  const response = fetch(`${API_URL}/users/pomodoros`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject("Unsuccessful request");
      }
      return res.json();
    })
    .then((data: Pomodoro[]) => {
      return Promise.resolve(
        data.map((pomodoro) => ({
          ...pomodoro,
          finished: new Date(pomodoro.finished),
        })),
      );
    });
  return response;
}

export async function addPomodoroToServer(
  token: string,
  pomodoro: Pomodoro,
): Promise<Pomodoro> {
  const response = fetch(`${API_URL}/users/pomodoros`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pomodoro),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject("Unsuccessful request");
      }
      return res.json();
    })
    .then((data: Pomodoro) => {
      return Promise.resolve({ ...data, finished: new Date(data.finished) });
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject("Service unavailable");
    });
  return response;
}
