const API_URL = process.env.REACT_APP_API_URL;

interface RegisterParameters {
  email: string;
  password: string;
}

interface RegisterResponse {
  data: {
    id: string;
    email: string;
  };
  errors?: string[];
}

export async function register(
  parameters: RegisterParameters,
): Promise<RegisterResponse> {
  console.log("Calling api: ", API_URL);
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
    return data;
  } else {
    const error = new Error(errors.join("\n"));
    return Promise.reject(error);
  }
}
