import { Box } from '@material-ui/core';
import React from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectVotesByRobot } from '../features/votes/votesSlice';

interface IVoteResultProps {
  className?: string
  total: number
}

const VoteResult: React.FunctionComponent<IVoteResultProps> = (props: IVoteResultProps)  => {
  return (
    <Box className={props.className}>
      {props.total === undefined ? 0 : props.total}
    </Box>
  )
}

export default VoteResult;