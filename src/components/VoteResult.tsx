import { Box } from '@material-ui/core';
import React from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectVotesByRobot } from '../features/votes/votesSlice';

const VoteResult = (props: any) => {


  return (
    <Box>
      {props.total === undefined ? 0 : props.total}
    </Box>
  )
}

export default VoteResult;