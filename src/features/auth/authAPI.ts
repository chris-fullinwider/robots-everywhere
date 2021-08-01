export interface ILoginBody {
  email: string,
  password: string
}

export interface IUserInfo {
  email: string,
  id: string,
  name: string, 
}

export interface ILoginResponse {
  status: number,
  data: {
    id: string,
    name: string,
    email: string,
    isAdmin: boolean,
    token: string
  }
}

// A mock function to mimic making an async request for data
export async function login(loginBody: ILoginBody): Promise<ILoginResponse> {
  // ASYNC CALL HERE
  try {
    const createSessionResponse = await fetch("https://mondo-robot-art-api.herokuapp.com/auth/session", {
      body: `{ "email": "${loginBody.email}", "password": "${loginBody.password}"}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-robot-art-api-key": "8db4e60b9ac3b234bf4b46fc22ec0908",
      },
      mode: 'cors',
      method: "POST",
    })

    const json = await createSessionResponse.json()
    const { token } = json;

    const getSessionResponse = await fetch("https://mondo-robot-art-api.herokuapp.com/auth/session", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      mode: 'cors',
      method: "GET",
    })

    const userInfo: IUserInfo = await getSessionResponse.json()
    const { email, id, name } = userInfo

    return {
      data: {
        id,
        name,
        email,
        token,
        isAdmin: email === 'admin@mondorobot.com',
      },
      status: createSessionResponse.status,
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

