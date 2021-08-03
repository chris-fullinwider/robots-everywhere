import { Button } from '@material-ui/core';
import React from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { PENDING } from '../features/constants';
import { createVoteAsync, deleteVoteAsync, IUserVote, selectUserVote, selectVotesStatus } from '../features/votes/votesSlice';

import './VoteButton.scss'

interface IVoteButtonProps {
  robotId: string
  className?: string
}

const VoteButton: React.FunctionComponent<IVoteButtonProps> = (props: IVoteButtonProps) => {
  const { robotId } = props
  const token = localStorage.getItem('token') as string
  const dispatch = useAppDispatch();
  const userVote: IUserVote = useAppSelector(selectUserVote)
  const votesStatus = useAppSelector(selectVotesStatus)
  
  const { voteId, robotId: userVoteRobotId} = userVote

  const isVoteButtonDisabled = () => {
    return !!(voteId || votesStatus === PENDING)
  }

  return (
    <>
      {robotId === userVoteRobotId &&
        <Button
          className={`vote-button ${props.className}`}
          variant="outlined"
          color="primary"
          onClick={() => {
            dispatch(deleteVoteAsync({ token, voteId}))
          }}
        >
          Delete Vote
        </Button>
      }
      {robotId !== userVoteRobotId &&
        <Button
          className="vote-button"
          variant="outlined"
          color="primary"
          disabled={isVoteButtonDisabled()}
          onClick={() => {
            dispatch(createVoteAsync({ token, robotId}))
          }}
        >Vote</Button>
      }
    </>
  );
}

export default VoteButton;
