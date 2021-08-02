import { Button } from '@material-ui/core';
import React, { MouseEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import {
  resetAuth,
  logoutAsync,
} from '../features/auth/authSlice'

export const LINK = 'link'
export const BUTTON = 'button'

interface ILogoutButtonProps {
  type: typeof LINK | typeof BUTTON;
}
const LogoutButton: React.FunctionComponent<ILogoutButtonProps> = (props: ILogoutButtonProps) => {
  const { type } = props
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token')

  if (!token) {
    return <Redirect exact to="/login" />
  }

  const logoutHandler = (evt: MouseEvent) => {
    evt.preventDefault()
    if (token) {
      dispatch(resetAuth())
      dispatch(logoutAsync(localStorage.getItem('token') as string))
    }
  }

  return (
    <>
      {type === LINK &&
        <Link
          className="logout-link"
          to="javascript:void(0)"
          onClick={logoutHandler}
        >
          Log out
        </Link>
      }
      {type === BUTTON &&
        <Button
          className="logout-button"
          variant="text"
          onClick={logoutHandler}
        >
          Log out
        </Button>
      }
    </>
  );
}

export default LogoutButton;
