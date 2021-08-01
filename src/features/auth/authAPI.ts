import { authInitialState, IAuthStateData } from './authSlice';

export interface IRegistrationBody {
  email: string,
  password: string,
  name: string,
}

interface IRegistrationResponse {
  status: number
  statusText?: string
}

export interface ILoginBody {
  email: string,
  password: string,
}

export interface IUserInfo {
  email: string | null,
  id: string | null,
  name: string | null,
}

export interface ILoginResponse {
  status: number,
  data: IAuthStateData,
}

export async function login(loginBody: ILoginBody): Promise<ILoginResponse> {
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

    if (createSessionResponse.status != 200) {
      // don't bother with the rest if initial request doesn't work
      return {
        data: authInitialState.data,
        status: createSessionResponse.status
      }
    }

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

    let userInfo: IUserInfo;
    // it's not the biggest deal in the world if this call fails
    // more like nice to have info
    if (getSessionResponse.status === 200) {
      userInfo = await getSessionResponse.json()
    } else {
      userInfo = {
        id: null,
        name: null,
        email: null,
      }
    }
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
    console.error('ERROR: ', error)
    throw new Error(error)
  }
}

export async function register(registrationBody: IRegistrationBody): Promise<IRegistrationResponse> {
  try {
    const registrationResponse = await fetch("https://mondo-robot-art-api.herokuapp.com/auth/register", {
      body: `{ "email": "${registrationBody.email}", "password": "${registrationBody.password}", "name": "${registrationBody.name}"}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-robot-art-api-key": "8db4e60b9ac3b234bf4b46fc22ec0908",
      },
      mode: 'cors',
      method: "POST",
    })

    return {
      status: registrationResponse.status,
      statusText: registrationResponse.statusText,
    }
  } catch (error: any) {
    console.error('ERROR: ', error)
    throw new Error(error)
  }
}
