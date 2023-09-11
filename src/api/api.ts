const API_URL = process.env.REACT_APP_API_URL;

interface RegisterParameters {
  email: string
  password: string
}


export async function register(parameters: RegisterParameters): Promise<any> {
  console.log("Calling api: ", API_URL);
  const response = await fetch(
    `${API_URL}/register`,
    {
      method: "POST",
      body: JSON.stringify(parameters)
    }
  ).catch(err => console.log(err))

  if (!response) {
    return Promise.reject("Can't connect to server")
  }

  const { data, errors } = await response.json();


  if (response.ok) {
    return data;
  } else {
    const error = new Error(errors.join("\n"))
    return Promise.reject(error)
  }
}
