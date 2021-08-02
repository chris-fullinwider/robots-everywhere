import { Box, Button } from '@material-ui/core';
import React from 'react';
import { useAppSelector } from '../app/hooks';
import { IAuthStateData, selectAuthData } from '../features/auth/authSlice';
import { IRobot } from '../features/robots/robotsAPI';
import VoteButton from './VoteButton';

interface IRobotTileProps {
  robot: IRobot;
  create: boolean
}

const RobotTile: React.FunctionComponent<IRobotTileProps> = (props: IRobotTileProps) => {
  const { robot, create } = props
  const { url, name, id } = robot

  const authData: IAuthStateData = useAppSelector(selectAuthData)
  const { isAdmin } = authData

  return (
    <Box
      className={`robot-tile ${create ? 'create' : ''}`}
    >
    {!create &&
      <>
        <h3>{name}</h3>
        <img src={url} alt={name} />
        {isAdmin === true && (
          <Button
            className="delete-button"
            variant="outlined"
            color="primary"
          >
            Delete
          </Button>
        )}
        {!isAdmin && (
          <VoteButton robotId={id} />
        )}
      </>
    }
    </Box>
  );
}

export default RobotTile;
