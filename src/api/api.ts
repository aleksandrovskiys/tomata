import { LoginInputs } from "../components/LoginPage/LoginForm";
import { User } from "../interafaces";

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
  console.log("calling register", `${API_URL}/register`);
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
  console.log("calling login", `${API_URL}/login`);
  const response = fetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify(parameters),
  })
    .then((res) => {
      if (res.status !== 200) {
        return Promise.reject("Invalid credentials");
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
  console.log("calling getUserInfo", `${API_URL}/users/me`);
  const response = fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      if (res.status !== 200) {
        return Promise.reject("Invalid credentials");
      }
      return res.json();
    })
    .then((data: UserInfo) => {
      return Promise.resolve(data.user);
    });
  return response;
}
