import { LoginInputs } from "../components/LoginPage/LoginForm";
import { AntiForgeryTokenResponse, Pomodoro, User } from "../interafaces";

const API_URL = process.env.REACT_APP_API_URL;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
const GOOGLE_AUTH_URL = process.env.REACT_APP_GOOGLE_AUTH_URL as string;
const DOMAIN = process.env.REACT_APP_DOMAIN as string;

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

export async function getAntiForgeryToken(): Promise<AntiForgeryTokenResponse> {
  const response = fetch(`${API_URL}/anti-forgery-token`, {
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject("Unsuccessful request");
      }
      return res.json();
    })
    .then((data) => {
      return Promise.resolve(data);
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject("Service unavailable");
    });

  return response;
}

export function openGoogleAuthWindow(state: string, redirect_uri: string) {
  const url =
    `${GOOGLE_AUTH_URL}?` +
    new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: `${DOMAIN}${redirect_uri}`,
      response_type: "code",
      scope: "openid email profile",
      state,
    });
  window.open(url, "_self");
}

export async function finalizeSignupWithGoogle(state: string, code: string) {
  const response = fetch(`${API_URL}/google-signup/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ state, code }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject("Unsuccessful request");
      }
      return res.json();
    })
    .then((data) => {
      return Promise.resolve(data);
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject("Service unavailable");
    });

  return response;
}
