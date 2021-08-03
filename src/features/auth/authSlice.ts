import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import * as constants from '../constants';
import * as authAPI from './authAPI';

export interface IAuthStateData {
  id: string | null,
  name: string | null,
  email: string | null,
  token: string | null,
  isAdmin: boolean | null,
}

export interface IAuthState {
  data: IAuthStateData,
  status: typeof constants.IDLE | typeof constants.PENDING | typeof constants.LOGIN_SUCCESS | typeof constants.LOGIN_FAILURE
    | typeof constants.SERVER_ERROR | typeof constants.REGISTER_SUCCESS | typeof constants.REGISTER_FAILURE
    | typeof constants.GET_SESSION_SUCCESS | typeof constants.GET_SESSION_FAILURE | typeof constants.LOGOUT_SUCCESS
    | typeof constants.LOGOUT_FAILURE | typeof constants.LOGGING_OUT | typeof constants.LOGGING_IN | typeof constants.SOMETHING_BROKE;
}

export const authInitialState: IAuthState = {
  data: {
    id: null,
    name: null,
    email: null,
    token: null,
    isAdmin: null,
  },
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
/**
 * creates AsyncThunk to be used with createSlice to create login actions / reducers
 */
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (loginBody: authAPI.ILoginBody) => {
    const response: authAPI.ILoginResponse = await authAPI.login(loginBody);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

/**
 * creates AsyncThunk to be used with createSlice to create registration actions / reducers
 */
export const registerAsync = createAsyncThunk(
  'auth/register',
  async (registrationBody: authAPI.IRegistrationBody) => {
    const response: authAPI.IRegistrationResponse = await authAPI.register(registrationBody);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

/**
 * creates AsyncThunk to be used with createSlice to create getSession actions / reducers
 */
export const getSessionAsync = createAsyncThunk(
  'auth/getSession',
  async (token: string) => {
    const response: authAPI.IGetSessionResponse = await authAPI.getSession(token)
    return response
  }
)

/**
 * creates asyncThunk to used with createSlice to create logout actions / reducers
 */
export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (token: string) => {
    const response: authAPI.ILogoutResponse = await authAPI.logout(token)
    return response
  }
)

/**
 * create a slice for auth data services
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    resetAuth: (state) => {
      state.data = authInitialState.data
      state.status = authInitialState.status
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // ----- loginAsync
      .addCase(loginAsync.pending, (state) => {
        state.status = constants.LOGGING_IN;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        if (action.payload.status >= 200) {
          const { token } = action.payload

          state.status = constants.LOGIN_SUCCESS
          state.data.token = token
          localStorage.setItem('token', token as string) // <-- using localstorage for token persistence
        }
        if (action.payload.status >= 400) {
          // TODO: ideally we have better reasons why the login failed
          // ie: bad email, or bad password
          state.status = constants.LOGIN_FAILURE
        }
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = constants.SOMETHING_BROKE
      })
      // ----- registerAsync
      .addCase(registerAsync.pending, (state) => {
        state.status = constants.PENDING;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        if (action.payload.status === 200 ) {
          state.status = constants.REGISTER_SUCCESS
        }
        if (action.payload.status >= 400 && action.payload.status < 500) {
          // TODO: ideally we have better reasons why the login failed
          // ie: bad email, or bad password
          state.status = constants.REGISTER_FAILURE
        }
        if (action.payload.status >= 500) {
          // can't remember if a 500 response will come through from the PROMISE.fulfilled or trigger the catch
          state.status = constants.SERVER_ERROR
        }
      })
      .addCase(registerAsync.rejected, (state) => {
        // would want to handle this a lot better, but that's detail work for later
        state.status = constants.SOMETHING_BROKE
      })
      // ----- getSessionAsync
      .addCase(getSessionAsync.pending, (state) => {
        state.status = constants.PENDING
      })
      .addCase(getSessionAsync.fulfilled, (state, action) => {
        const { status } = action.payload
        const { email, name, id } = action.payload.data

        if (status === 200) {
          state.data.name = name
          state.data.id = id
          state.data.email = email
          state.data.isAdmin = email === 'admin@mondorobot.com' // <-- ideally want a better way to determine this
          state.status = constants.GET_SESSION_SUCCESS
        }
        if (action.payload.status >= 400 && action.payload.status < 500) {
          // TODO: ideally we have better reasons why the login failed
          // ie: bad email, or bad password
          state.status = constants.GET_SESSION_FAILURE
        }
        if (action.payload.status >= 500) {
          // can't remember if a 500 response will come through from the PROMISE.fulfilled or trigger the catch
          state.status = constants.SERVER_ERROR
        }
      })
      .addCase(getSessionAsync.rejected, (state) => {
        // would want to handle this a lot better, but that's detail work for later
        state.status = constants.SOMETHING_BROKE
      })
      // ----- logoutAsync
      .addCase(logoutAsync.pending, (state) => {
        state.status = constants.LOGGING_OUT
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        const { status } = action.payload

        if (status === 200) {
          localStorage.removeItem('token') // <-- remove token from localstorage on successful logout
          state.status = constants.LOGOUT_SUCCESS
        }

        if (action.payload.status >= 400 && action.payload.status < 500) {
          // TODO: ideally we have better reasons why the login failed
          // ie: bad email, or bad password
          state.status = constants.LOGOUT_FAILURE
        }
        if (action.payload.status >= 500) {
          // can't remember if a 500 response will come through from the PROMISE.fulfilled or trigger the catch
          state.status = constants.SERVER_ERROR
        }
      })
      .addCase(logoutAsync.rejected, (state) => {
        // would want to handle this a lot better, but that's detail work for later
        state.status = constants.SOMETHING_BROKE
      })
  },
});

// export actions generated by createSlice()
export const { resetAuth } = authSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectToken = (state: RootState): string | null => state.auth.data.token;
export const selectAuthStatus = (state: RootState): string => state.auth.status;
export const selectAuthData = (state: RootState): IAuthStateData => state.auth.data;

export default authSlice.reducer;
