import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { IAuthStateData, selectAuthData } from '../features/auth/authSlice';
import { IRobot } from '../features/robots/robotsAPI';
import { getRobotsAsync, selectAllRobotsData } from '../features/robots/robotsSlice';
import RobotTile from './RobotTile';

const RobotTileContainer: React.FunctionComponent<any> = () => {

  const token = localStorage.getItem('token') as string
  const dispatch = useAppDispatch();
  const allRobots = useAppSelector(selectAllRobotsData)
  const authData: IAuthStateData = useAppSelector(selectAuthData)


  useEffect(() => {
    dispatch(getRobotsAsync(token))
    // dispatch getVoteEligibility
    // - need to manage what happens when user votes
  }, []);


  return (
    <Box>
      { authData.isAdmin &&
        <RobotTile create robot={{} as IRobot}/>
      }
      {allRobots.map(
        (robot: IRobot, index) =>
          <RobotTile
            create={false}
            robot={robot}
            key={`robot-${index}`}
          />
      )}
    </Box>
  );
}

export default RobotTileContainer;
