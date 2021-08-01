import React from 'react';
import './App.css';
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps
} from "react-router-dom"
import { store } from './app/store';
import { Provider } from 'react-redux';
import Login from './components/Login';
import Header from './components/Header';
import Robots from './components/Robots';

type IAppProps = RouteComponentProps

export const ROBOTS_PATH = '/robots'
export const RESULTS_PATH = '/results'
export const LOGIN_PATH = '/login'

const App: React.FunctionComponent<IAppProps> = (props:IAppProps) => {
  const token = localStorage.getItem('token')
  return (
    <Provider store={store}>
      {props.location.pathname !== LOGIN_PATH &&
        <Header />
      }
      <Switch>
        <Route exact path="/">
        {!!token === true
          ? <Redirect exact to={ROBOTS_PATH} />
          : <Redirect exact to={LOGIN_PATH} />
        }
        </Route>
        <Route exact path={LOGIN_PATH}>
          <Login />
        </Route>
        <Route exact path={ROBOTS_PATH}>
          <Robots />
        </Route>
        {/* <Route path="/results">
        </Route> */}
      </Switch>
    </Provider>
  );
}

export default withRouter(App);
