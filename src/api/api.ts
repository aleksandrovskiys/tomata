const API_URL = process.env.REACT_APP_API_URL;

interface RegisterParameters {
  email: string
  password: string
}


export async function register(parameters: RegisterParameters) {
  console.log("Calling api: ", API_URL);
  const response = await fetch(
    `${API_URL}/register`,
    {
      method: "POST",
      body: JSON.stringify(parameters)
    }
  )

  const { data, errors } = await response.json();


  if (response.ok) {
    return data;
  } else {
    const error = new Error(errors.join("\n"))
    return Promise.reject(error)
  }
}
