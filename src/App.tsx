import React from 'react';
import './App.css';
import {
  Switch,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom"
import { store } from './app/store';
import { Provider } from 'react-redux';
import Login from './components/Login';

interface IAppProps {
  history: any
}
const App: React.FunctionComponent<any> = (props:IAppProps) => {
  const token = localStorage.getItem('token')
  console.log('PROPS: ', JSON.stringify(props))
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/">
        {!!token === true
          ? <Redirect exact to="/robots" />
          : <Redirect exact to="/login" />
        }
        </Route>
        <Route exact path="/login" component={Login} />
        <Route path="/robots">
        </Route>
        {/* <Route path="/results">
        </Route> */}
      </Switch>
    </Provider>
  );
}

export default withRouter(App);
