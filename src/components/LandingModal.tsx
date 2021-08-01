// eslint-disable-next-line
import React, { useState } from 'react';

import { Box } from '@material-ui/core';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import './LandingModal.scss';


const LandingModal: React.FunctionComponent = () => {
  const [ isLoginForm, setIsLoginForm ] = useState(true)

  return (
    <Box display="flex" className="landing-modal">
      { isLoginForm &&
        <LoginForm setIsLoginForm={setIsLoginForm} />
      }
      { !isLoginForm &&
        <RegistrationForm
          setIsLoginForm={setIsLoginForm}
        />
      }
    </Box>
  );
}

export default LandingModal;
