export interface IVote {
  id: string,
  robot: string,
  user: string,
}

export interface IVotesByRobot {
  [key: string]: number // <--  will be robot.name
}

export interface IGetVotesByRobotResponse {
  data: {
    votesByRobot: IVotesByRobot,
  },
  statusText: string,
  status: number,
}

export interface IVotesResponse {
  data: {
    votes: IVote[]
  },
  status: number,
  statusText: string,
}

export interface IDeleteVoteResponse {
  status: number,
  statusText: string,
}

export interface ICreateVoteResponse {
  data: {
    vote: IVote
  },
  status: number,
  statusText: string,
}

export interface IGetUserVoteResponse {
  data: {
    userVote: IVote
  },
  status: number,
  statusText: string,
}

/**
 * get all current votes
 * @param token bearer token
 * @returns IGetVotesResponse -- aggregate votes
 */
export const getVotes = async (token: string): Promise<IVotesResponse> => {
  let votes: IVote[];

  try {
    const getVotesResponse = await fetch("https://mondo-robot-art-api.herokuapp.com/votes", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      mode: 'cors',
      method: "GET",
    })
    const { status, statusText } = getVotesResponse

    if (status === 200) {
      votes = await getVotesResponse.json()
    } else {
      votes = []
    }

    return {
      data: {
        votes,
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
 * @param token bearer token
 * @returns votes by robot { [robotId]: number }
 */
export const  getVotesByRobot = async (token: string): Promise<IGetVotesByRobotResponse> => {
  try {

    const votesResponse = await getVotes(token as string)
    const { statusText, status, data } = votesResponse
    const { votes: allVotes } = data

    let votesByRobot: IVotesByRobot;

    if (status === 200) {
      votesByRobot = allVotes.reduce((acc: IVotesByRobot, vote: IVote) => {
        const { robot: robotId } = vote

        if (acc[robotId]) {
          acc[robotId] += 1
        } else {
          acc[robotId] = 1
        }

        return acc
      }, {})

    } else {
      votesByRobot = {} as IVotesByRobot
    }

    return {
      data: {
        votesByRobot,
      },
      statusText,
      status
    }

  } catch (error: any) {
    console.log('ERROR: ', error)
    throw new Error(error)
  }

}

/**
 * gets the vote that the user has cast (if they have cast one)
 * @param token bearer token
 * @param userId
 */
export const getUserVote = async (token: string, userId: string): Promise<IGetUserVoteResponse> => {
  try {
    const votesResponse = await getVotes(token as string)
    const { statusText, status, data } = votesResponse
    const { votes: allVotes } = data

    let userVote: IVote = {} as IVote
    if (status === 200) {
      console.log('ALL VOTES: ', allVotes)
      console.log('USERID: ', userId)
      userVote = allVotes.find((vote: IVote) => vote.user === userId) || {} as IVote
    }

    return {
      data: {
        userVote,
      },
      status,
      statusText,
    }
  } catch (error: any) {
    console.log('Error: ', error)
    throw new Error(error)
  }
}

/**
 * @param token bearer token
 * @param voteId vote id
 * @returns status and statusText
 */
export const deleteVote = async (token: string, voteId: string): Promise<IDeleteVoteResponse> => {
  try {
    const deleteVoteResponse = await fetch(`https://mondo-robot-art-api.herokuapp.com/votes/${voteId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      mode: 'cors',
      method: "DELETE",
    })
    const { status, statusText } = deleteVoteResponse

    return {
      status,
      statusText,
    }
  } catch (error: any) {
    console.error('ERROR: ', error)
    throw new Error(error)
  }
}

export const createVote = async (token: string, robotId: string): Promise<ICreateVoteResponse> => {
  try {
    const createVoteResponse = await fetch("https://mondo-robot-art-api.herokuapp.com/votes", {
      body: `{ "robot": "${robotId}" }`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      mode: 'cors',
      method: 'POST',
    })

    let vote: IVote;
    const { status, statusText } = createVoteResponse
    if (status === 200) {
      vote = await createVoteResponse.json()
    } else {
      vote = {} as IVote
    }

    return {
      data: {
        vote
      },
      status,
      statusText,
    }
  } catch (error: any) {
    console.error('ERROR: ', error)
    throw new Error(error)
  }
}
