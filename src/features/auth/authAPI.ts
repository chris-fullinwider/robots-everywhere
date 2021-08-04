export interface IGetSessionResponse {
  status: number,
  data: IUserInfo
}

export interface IRegistrationBody {
  email: string,
  password: string,
  name: string,
}

export interface IRegistrationResponse {
  status: number
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
  token: string | null;
}

export interface ILogoutResponse {
  status: number;
}

/**
 * get the current user session by token
 * @param token bearer token
 * @returns IGetSessionResponse -- session information based on bearer token
 */
export const getSession = async (token: string): Promise<IGetSessionResponse> => {
  let userInfo: IUserInfo = {
    id: null,
    name: null,
    email: null,
  }

  try {
    const getSessionResponse = await fetch("https://mondo-robot-art-api.herokuapp.com/auth/session", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      mode: 'cors',
      method: "GET",
    })
    const { status } = getSessionResponse
    if (getSessionResponse.status === 200) {
      userInfo = await getSessionResponse.json()
    }
    return {
      status,
      data: userInfo,
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

/**
 * attempt to login with email and password credentials
 * @param loginBody ILoginBody
 * @returns ILoginResponse -- get bearer token to be used with subsequent requests
 */
export const login = async (loginBody: ILoginBody): Promise<ILoginResponse> => {
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

    const { status: responseStatus } = createSessionResponse
    if (responseStatus != 200) {
      // don't bother with the rest if initial request doesn't work
      return {
        token: null,
        status: createSessionResponse.status
      }
    }

    const json = await createSessionResponse.json()
    const { token } = json;

    return {
      token,
      status: responseStatus,
    }
  } catch (error: any) {
    console.error('ERROR: ', error)
    throw new Error(error)
  }
}

/**
 * attempt to register a new user
 * @param registrationBody IRegistrationBody -- username, email, password
 * @returns IRegistrationResponse -- only returning status of request
 */
export const register = async (registrationBody: IRegistrationBody): Promise<IRegistrationResponse> => {
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
    }
  } catch (error: any) {
    console.error('ERROR: ', error)
    throw new Error(error)
  }
}

/**
 * logs the user out by deleting session
 * @param token bearer token
 * @returns { status }
 */
export const logout = async (token: string): Promise<ILogoutResponse> => {
  try {
    const logoutResponse = await fetch("https://mondo-robot-art-api.herokuapp.com/auth/session", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      mode: 'cors',
      method: "Delete",
    })

    const { status } = logoutResponse

    return {
      status
    }
  } catch (error: any) {
    console.log('Error', error)
    throw new Error(error)
  }
}