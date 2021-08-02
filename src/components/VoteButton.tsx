import { Button } from '@material-ui/core';
import React from 'react';

interface IVoteButtonProps {
  robotId: string
}

const VoteButton: React.FunctionComponent<IVoteButtonProps> = (props: IVoteButtonProps) => {
  const { robotId } = props

  // see if person has voted
  // eligibility will be determined by voteSlice state

  return (
    <Button>Vote</Button>
  );
}

export default VoteButton;
