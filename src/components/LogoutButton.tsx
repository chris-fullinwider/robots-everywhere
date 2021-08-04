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

/**
 * creates a logout button component
 * @param props logout button type
 * @returns logout button (<Button> or <Link>)
 */
const LogoutButton: React.FunctionComponent<ILogoutButtonProps> = (props: ILogoutButtonProps) => {
  const { type } = props
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token')

  if (!token) {
    return <Redirect exact to="/login" />
  }

  /**
   * @param evt click event
   */
  const logoutHandler = (evt: MouseEvent) => {
    evt.preventDefault()
    const userConfirm = confirm('Human, do you wish to proceed?')
    if (token && userConfirm) {
      dispatch(resetAuth())
      dispatch(logoutAsync(localStorage.getItem('token') as string))
    } else {
      // if i had time i would give em a pop up 'splaining what went wrong
      alert('Logout Failed, now you must stay here... forever')
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
