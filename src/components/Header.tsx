import { Box, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import React, { MouseEvent, MouseEventHandler, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { RESULTS_PATH, ROBOTS_PATH } from '../App';
import logo from '../brand_logo.svg';
import LogoutButton from './LogoutButton';

const NAV_LINK = 'nav-link'
const ON = 'on'
const OFF = 'off'

type IHeaderProps = RouteComponentProps

const toggleMenu = (evt: MouseEvent) => {
  evt.preventDefault();
}

const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<Element>()
  const robotsOn = props.location.pathname === ROBOTS_PATH
  const resultsOn = props.location.pathname === RESULTS_PATH
  const handleOpen = (evt: MouseEvent) => {
    setAnchorEl(evt.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(undefined)
  }

  console.log(anchorEl)

  return (
    <header>
      <Box className="header-group__left">
        <img src={logo} alt="logo" />
        <Link
          className={`${NAV_LINK}__robots ${robotsOn ? ON : OFF}`}
          to={ROBOTS_PATH}
        >
          Robots
        </Link>
        <Link
          className={`${NAV_LINK}__results ${resultsOn ? ON : OFF}`}
          to={RESULTS_PATH}
        >
          Results
        </Link>
      </Box>
      <Box className="header-group__right">
        <LogoutButton />
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={anchorEl === undefined ? handleOpen : handleClose}
        >
          {anchorEl == undefined &&
            <MenuIcon />
          }
          {anchorEl !== undefined &&
            <CloseIcon />
          }
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to={ROBOTS_PATH}>Robots</Link>

              <Link to={ROBOTS_PATH}>Robots</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to={RESULTS_PATH}>Results</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <LogoutButton />
            </MenuItem>
          </Menu>
        </IconButton>

      </Box>
    </header>
  );
}

export default withRouter(Header);
