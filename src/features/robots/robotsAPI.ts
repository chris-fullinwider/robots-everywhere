import { TableBody } from "@material-ui/core";
import { BorderStyleRounded } from "@material-ui/icons";

export interface IRobot {
  id: string,
  name: string,
  url: string,
}

export interface IGetRobotsResponse {
  data: IRobot[],
  statusText: string
  status: number,
}

export interface ICreateRobotBody {
  name: string,
  image: string,
}

export interface ICreateRobotResponse {
  data: {
    robot: IRobot
  },
  status: number,
  statusText: string,
}

export interface IDeleteRobotResponse {
  robotId: string,
  status: number,
  statusText: string,
}

/**
 * get the current user session by token
 * @param token bearer token
 * @returns IGetSessionResponse -- session information based on bearer token
 */
export const getRobots = async (token: string): Promise<IGetRobotsResponse> => {
  let robots: IRobot[];

  try {
    const getRobotsResponse = await fetch("https://mondo-robot-art-api.herokuapp.com/robots", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      mode: 'cors',
      method: "GET",
    })
    const { status, statusText } = getRobotsResponse

    if (status === 200) {
      robots = await getRobotsResponse.json()
    } else {
      robots = []
    }

    return {
      data: robots,
      status,
      statusText
    }

  } catch (error: any) {
    console.log('ERROR: ', error)
    throw new Error(error)
  }
}

/**
 * create a robot
 * @param token bearer token
 * @param data FormData to be converted into robot { name: string, image: File }
 * @returns ICreateRobotResponse
 */
export const createRobot = async (token: string, data: FormData): Promise<any> => {
  try {

    const createRobotResponse = await fetch("https://mondo-robot-art-api.herokuapp.com/robots", {
      body: data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    })
    const { status, statusText } = createRobotResponse

    let createdRobot: IRobot = {} as IRobot
    if (status === 200) {
      createdRobot = await createRobotResponse.json()
    } else {
      createdRobot = {} as IRobot
    }

    return {
      data: {
        robot: createdRobot
      },
      status,
      statusText
    }

  } catch (error: any) {
    console.log('ERROR: ', error)
    throw new Error(error)
  }
}


/**
 * delete a robot
 * @param token bearer token
 * @param robotId string
 * @returns IDeleteRobotResponse
 */
export const deleteRobot = async (token: string, robotId: string): Promise<IDeleteRobotResponse> => {
  try {
    const deleteRobotResponse = await fetch(`https://mondo-robot-art-api.herokuapp.com/robots/${robotId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      mode: 'cors',
      method: "DELETE",
    })
    const { status, statusText } = deleteRobotResponse

    return {
      robotId,
      status,
      statusText,
    }
  } catch (error: any) {
    console.error('ERROR: ', error)
    throw new Error(error)
  }
}
