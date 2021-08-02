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
