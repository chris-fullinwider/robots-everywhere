import { Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import React, { MouseEvent, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { RESULTS_PATH, ROBOTS_PATH } from '../App';
import logo from '../brand_logo.svg';
import './Header.scss';
import LogoutButton, { BUTTON, LINK } from './LogoutButton';

const NAV_LINK = 'nav-link'
const HEADER_GROUP = 'header-group'
const ON = 'on'
const OFF = 'off'

type IHeaderProps = RouteComponentProps

/**
 * Header Component
 * @param props IHeaderProps
 * @returns Header component for the application including nav bar
 */
const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<Element>()
  const robotsOn = props.location.pathname === ROBOTS_PATH
  const resultsOn = props.location.pathname === RESULTS_PATH

  /**
   * handle open mobile menu
   * @param evt click event
   */
  const handleOpen = (evt: MouseEvent) => {
    setAnchorEl(evt.currentTarget)
  }

  /**
   * handles closing mobile menu
   */
  const handleClose = () => {
    setAnchorEl(undefined)
  }

  return (
    <header className="header">
      <Box className={`${HEADER_GROUP} ${HEADER_GROUP}__left`}>
        <img src={logo} alt="logo" />
        <Link
          className={`${NAV_LINK} ${NAV_LINK}__robots ${robotsOn ? ON : OFF}`}
          to={ROBOTS_PATH}
        >
          Robots
        </Link>
        <Link
          className={`${NAV_LINK} ${NAV_LINK}__results ${resultsOn ? ON : OFF}`}
          to={RESULTS_PATH}
        >
          Results
        </Link>
      </Box>
      <Box className={`${HEADER_GROUP} ${HEADER_GROUP}__right`}>
        <LogoutButton type={BUTTON} />
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          id="menu-trigger"
          onClick={anchorEl === undefined ? handleOpen : handleClose}
        >
          {anchorEl == undefined &&
            <MenuIcon />
          }
          {anchorEl !== undefined &&
            <CloseIcon />
          }
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link
              className={`${NAV_LINK} ${NAV_LINK}__robots ${robotsOn ? ON : OFF}`}
              to={ROBOTS_PATH}
            >
              Robots
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link
              className={`${NAV_LINK} ${NAV_LINK}__results ${resultsOn ? ON : OFF}`}
              to={RESULTS_PATH}
            >
              Results
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <LogoutButton type={LINK} />
          </MenuItem>
        </Menu>
      </Box>
    </header>
  );
}

export default withRouter(Header);
