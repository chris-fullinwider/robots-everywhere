import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { LOGIN_PATH } from '../App';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as authSlice from '../features/auth/authSlice';
import { getRobotsAsync } from '../features/robots/robotsSlice'
import { selectVotesStatus } from '../features/votes/votesSlice'
import { CREATE_VOTE_SUCCESS, DELETE_VOTE_SUCCESS, GET_SESSION_FAILURE, LOGGING_OUT, LOGOUT_SUCCESS } from '../features/constants';
import { Box } from '@material-ui/core';

import './Robots.scss'
import RobotTileContainer from './RobotTileContainer';
import { getUserVoteAsync, getVotesByRobotAsync } from '../features/votes/votesSlice';

const Robots: React.FunctionComponent<any> = () => {
  const [ready, setReady] = useState(false)
  const token = localStorage.getItem('token') as string;
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(authSlice.selectAuthStatus)
  const votesStatus = useAppSelector(selectVotesStatus )
  const authData = useAppSelector(authSlice.selectAuthData)

  useEffect(() => {
    let getRobots: any;
    let getVotesByRobot: any;
    let getUserVote: any;

    // do this serially, so we guarantee that subsequent requests have auth data they need
    dispatch(authSlice.getSessionAsync(token)).then(() => {
      getRobots = dispatch(getRobotsAsync(token))
      getVotesByRobot = dispatch(getVotesByRobotAsync(token))
      getUserVote = dispatch(getUserVoteAsync({ token, userId: authData.id as string }))
      setReady(true)
    }).catch((e) => {
      throw new Error(e)
    })
    return () => {
      getRobots.abort()
      getVotesByRobot.abort()
      getUserVote.abort()
    }
  }, [])

  if (!ready) {
    return <h1 className="loading">Computing...</h1>
  }

  if (votesStatus === CREATE_VOTE_SUCCESS || votesStatus === DELETE_VOTE_SUCCESS) {
    dispatch(getVotesByRobotAsync(token))
  }

  return (
    <Box
      className='robots'
    >
      {authStatus === LOGOUT_SUCCESS &&
        // this should be done in a HOC
        <Redirect exact to={LOGIN_PATH} />
      }
      <div className="heading-container">
        <h1>{`Greetings hu... I mean, ${authData.name}`}</h1>
      </div>
      <RobotTileContainer />
    </Box>
  );
}

export default Robots;
