// eslint-disable-next-line
import React from 'react';

import { Container } from '@material-ui/core';

import LoginModal from './AuthContainer';
import './Login.scss';

const Login: React.FunctionComponent = () => {
  return (
    <Container className="login-layout">
      <LoginModal />
    </Container>
  );
}

export default Login;
