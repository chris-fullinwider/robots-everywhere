import { Box, Button, TextField } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { FormEventHandler, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RESULTS_PATH, ROBOTS_PATH } from '../App';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import { IAuthStateData, selectAuthData } from '../features/auth/authSlice';
import { CREATE_ROBOT_SUCCESS, PENDING } from '../features/constants';
import { IRobot } from '../features/robots/robotsAPI';
import { createRobotAsync, deleteRobotAsync, selectRobotsStatus } from '../features/robots/robotsSlice';
import { selectVotesByRobot } from '../features/votes/votesSlice';
import './RobotTile.scss';
import VoteButton from './VoteButton';
import VoteResult from './VoteResult';

interface IRobotTileProps extends RouteComponentProps {
  robot: IRobot;
  create: boolean;
}


/**
 * render a robot tile or a create robot tile
 * @param props a robot and a create flag
 * @returns a component to render a ROBOT or a create robot tile
 */
const RobotTile: React.FunctionComponent<IRobotTileProps> = (props: IRobotTileProps) => {
  const { location, robot, create } = props
  const { url, name, id } = robot
  const [createRobotFile, setCreateRobotFile] = useState<File | undefined>()
  const [createRobotName, setCreateRobotName] = useState('')

  const dispatch: AppDispatch = useAppDispatch();
  const token: string = localStorage.getItem('token') as string

  const authData: IAuthStateData = useAppSelector(selectAuthData)
  const { isAdmin } = authData
  const robotsStatus: string = useAppSelector(selectRobotsStatus)
  const votesByRobot = useAppSelector(selectVotesByRobot)

  /**
   * handles the create robot form submission
   * @param event form submit event
   */
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

  /**
   * determine if create button should be disabled
   * @returns boolean
   */
  const shouldDisableCreateButton = (): boolean => {
    return (
      robotsStatus === PENDING
      || !createRobotName
      || !createRobotFile
    )
  }

  // TODO: should break the create tile out into it's own component, this is becoming a bit of a rat nest
  if ( robotsStatus === CREATE_ROBOT_SUCCESS && (createRobotName || createRobotFile)) {
    // TODO: how in the hell am i going to reset this form?
    // the DropzoneArea component has no interface to reset...
    // for now, the form will retain a the file upload in DropzoneArea state as there is no way to programatically reset it
    // this is shit user experience, but there's no time!
    // resetCreate()
  }

  return (
    <Box
      className={`robot-tile ${create ? 'create' : ''}`}
    >
    {!create &&
      <>
        <div className="tile-header">
          <h3>{name}</h3>
        </div>
        <div className="tile-body">
          <img
            src={url}
            alt={name}
            className="robot-tile-image"
          />
        </div>
        <div className="tile-footer">
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
            <VoteButton className="vote-button" robotId={id} />
          )}
          {location.pathname === RESULTS_PATH && (
            <VoteResult className="vote-result" total={votesByRobot[robot.id]}/>
          )}
        </div>
      </>
    }
    {create &&
      <>
        <div className="tile-header">
          <h3>Add Robot</h3>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="tile-body">
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
        </div>
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
            disabled={shouldDisableCreateButton()}
          >
            Add Robot
          </Button>
        </form>
      </>
    }
    </Box>
  );
}

export default withRouter(RobotTile);
