import { LoginInputs } from "../components/LoginPage/LoginForm";

const API_URL = process.env.REACT_APP_API_URL;

interface RegisterParameters {
  email: string;
  password: string;
}

interface BasicResponse {
  data: any;
  errors?: string[];
}

interface RegisterResponse extends BasicResponse {
  data: {
    id: string;
    email: string;
  };
}

interface LoginResponse extends BasicResponse {
  data: {
    email: string;
    id: number;
    token: string;
  };
}

export async function register(
  parameters: RegisterParameters
): Promise<RegisterResponse> {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    body: JSON.stringify(parameters),
  }).catch((err) => console.log(err));

  if (!response) {
    const error = new Error("Can't connect to server");
    return Promise.reject(error);
  }

  const { data, errors } = await response.json();

  if (response.ok) {
    return Promise.resolve(data);
  } else {
    const error = new Error(errors.join("\n"));
    return Promise.reject(error);
  }
}

export async function login(parameters: LoginInputs): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify(parameters),
  })
    .then((res) => res.json())
    .then((data: LoginResponse) => {
      return Promise.resolve(data);
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });

  return response;
}
