import { Box } from '@material-ui/core';
import React from 'react';

interface IVoteResultProps {
  className?: string
  total: number
}

/**
 * let's not talk about this one ;)
 * @param props total number of votes to render
 * @returns the most pathetic component in the world
 */
const VoteResult: React.FunctionComponent<IVoteResultProps> = (props: IVoteResultProps)  => {
  return (
    <Box className={props.className}>
      {props.total === undefined ? 0 : props.total}
    </Box>
  )
}

export default VoteResult;