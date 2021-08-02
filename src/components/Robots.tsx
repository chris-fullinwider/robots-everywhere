import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { LOGIN_PATH } from '../App';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as authSlice from '../features/auth/authSlice';
import { selectRobotsStatus } from '../features/robots/robotsSlice'
import { GET_SESSION_FAILURE, LOGOUT_SUCCESS, PENDING } from '../features/constants';
import { Box } from '@material-ui/core';

import './Robots.scss'
import RobotTileContainer from './RobotTileContainer';

const Robots: React.FunctionComponent<any> = () => {
  const token = localStorage.getItem('token') as string;
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(authSlice.selectAuthStatus)
  const robotsStatus = useAppSelector(selectRobotsStatus)
  const authData = useAppSelector(authSlice.selectAuthData)

  useEffect(() => {
    if (!authData.id) {
      dispatch(authSlice.getSessionAsync(token))
    }
  }, [])

  if (authStatus === GET_SESSION_FAILURE) {
    return <Redirect exact to={LOGIN_PATH} />
  }

  if (authStatus === PENDING) {
    return <div className='robots'>LOADING</div>
  }

  return (
    <Box
      className='robots'
    >
      {authStatus === LOGOUT_SUCCESS &&
        // this should be done in a HOC
        <Redirect exact to={LOGIN_PATH} />
      }
      <h1>{`Greetings hu... I mean, ${authData.name}`}</h1>
      <RobotTileContainer />
    </Box>
  );
}

export default Robots;
