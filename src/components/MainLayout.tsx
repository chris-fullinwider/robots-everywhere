// eslint-disable-next-line
import React from 'react';

import { Container } from '@material-ui/core';

import LandingModal from './LandingModal';
import './MainLayout.scss';

const MainLayout: React.FunctionComponent = () => {
  return (
    <Container className="main-layout">
      <LandingModal />
      {/* TODO login and registration form will go here */}
    </Container>
  );
}

export default MainLayout;
