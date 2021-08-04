import React from 'react';
import { Box } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { ROBOTS_PATH } from '../App';
import { useAppSelector } from '../app/hooks';
import { IAuthStateData, selectAuthData } from '../features/auth/authSlice';
import { IRobot } from '../features/robots/robotsAPI';
import { selectAllRobotsData } from '../features/robots/robotsSlice';
import RobotTile from './RobotTile';

import './RobotTileContainer.scss'

/**
 * a component to house RobotTile's
 * @returns a collection of RobotTile
 */
const RobotTileContainer: React.FunctionComponent<any> = () => {
  const allRobots = useAppSelector(selectAllRobotsData)
  const authData: IAuthStateData = useAppSelector(selectAuthData)

  return (
    <Box
      className='robot-tile-container'
    >
      {authData.isAdmin && location.pathname === ROBOTS_PATH &&
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

export default withRouter(RobotTileContainer);
