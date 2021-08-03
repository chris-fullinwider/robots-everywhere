import { DropzoneArea } from 'material-ui-dropzone'
import { Box, Button, TextField } from '@material-ui/core';
import React, { FormEventHandler, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { IAuthStateData, selectAuthData } from '../features/auth/authSlice';
import { IRobot } from '../features/robots/robotsAPI';
import VoteButton from './VoteButton';

import './RobotTile.scss'
import { createRobotAsync, deleteRobotAsync, selectRobotsStatus } from '../features/robots/robotsSlice';
import { CREATE_ROBOT_SUCCESS, PENDING } from '../features/constants';
import { AppDispatch } from '../app/store';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RESULTS_PATH, ROBOTS_PATH } from '../App';
import { selectVotesByRobot } from '../features/votes/votesSlice';
import VoteResult from './VoteResult';

interface IRobotTileProps extends RouteComponentProps {
  robot: IRobot;
  create: boolean;
}

const RobotTile: React.FunctionComponent<IRobotTileProps> = (props: IRobotTileProps) => {
  const { location, robot, create } = props
  const { url, name, id } = robot
  const [dropzoneKey, setDropzoneKey] = useState(0) // <-- allows us to clear dropzone on create success / clear
  const [createRobotFile, setCreateRobotFile] = useState<File | undefined>()
  const [createRobotName, setCreateRobotName] = useState('')

  const dispatch: AppDispatch = useAppDispatch();
  const token: string = localStorage.getItem('token') as string

  const authData: IAuthStateData = useAppSelector(selectAuthData)
  const { isAdmin } = authData
  const robotsStatus: string = useAppSelector(selectRobotsStatus)
  const votesByRobot = useAppSelector(selectVotesByRobot)

  const handleSubmit: FormEventHandler = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault(); // <-- don't want to redirect browser

    if (createRobotFile) {
      const data: FormData = new FormData(event.target as HTMLFormElement)
      data.append('image', createRobotFile)
      dispatch(createRobotAsync({ token, data}))
    }
  }

  /**
   * reset the create tile's state
   */
  const resetCreate = () => {
    // setDropzoneKey(dropzoneKey + 1)
    setCreateRobotName('')
    setCreateRobotFile(undefined)
  }

  const shouldDisableCreateButton = (robotsStatus: string): boolean => {
    return (
      robotsStatus === PENDING
      || !createRobotName
      || !createRobotFile
    )
  }

  // TODO: should break the create tile out into it's own component, this is becoming a bit of a rat nest
  if ( robotsStatus === CREATE_ROBOT_SUCCESS && (createRobotName || createRobotFile)) {
    // resetCreate()
  }

  return (
    <Box
      className={`robot-tile ${create ? 'create' : ''}`}
    >
    {!create &&
      <>
        <h3>{name}</h3>
        <img
          src={url}
          alt={name}
          className="robot-tile-image"
        />
        {isAdmin === true && location.pathname === ROBOTS_PATH && (
          <Button
            className="delete-button"
            variant="outlined"
            color="primary"
            onClick={() => {
              const userConfirm = confirm(`Shall we decomission ${name}?`);
              if (userConfirm) {
                dispatch(deleteRobotAsync({ token, robotId: id }))
              }
            }}
          >
            Delete
          </Button>
        )}
        {!isAdmin === true && location.pathname === ROBOTS_PATH && (
          <VoteButton robotId={id} />
        )}
        {location.pathname === RESULTS_PATH && (
          <VoteResult total={votesByRobot[robot.id]}/>
        )}
      </>
    }
    {create &&
      <>
        <h3>Add Robot</h3>
        <form onSubmit={handleSubmit}>
          <TextField
            className="create-robot-name-input"
            value={createRobotName}
            label="Name"
            name="name"
            variant="outlined"
            color="primary"
            onChange={(evt) => setCreateRobotName(evt.target.value)}
          ></TextField>
          <DropzoneArea
            filesLimit={1}
            onChange={(files: File[]) => {
              if (files && files.length > 0) {
                setCreateRobotFile(files[0])
              } else {
                setCreateRobotFile(undefined)
              }
            }}
          />
          <Box className="admin-button-group">
            <Button
              className="create-robot-clear-button"
              onClick={() => {
                resetCreate()
              }}
            >
              Clear
            </Button>
            <Button
              className="create-robot-add-button"
              variant="contained"
              color="primary"
              type="submit"
              disabled={shouldDisableCreateButton(robotsStatus)}
            >
              Add Robot
            </Button>
          </Box>
        </form>
      </>
    }
    </Box>
  );
}

export default withRouter(RobotTile);
