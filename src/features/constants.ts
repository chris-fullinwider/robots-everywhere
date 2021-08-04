// I think this methodology for status might have been a mistake, but it works well enough at this scale

// general statuses
export const IDLE = 'idle'
export const PENDING = 'pending'
export const SERVER_ERROR = 'server error'
export const SOMETHING_BROKE = 'something broke'

// auth statuses
export const LOGGING_OUT = 'logging out'
export const LOGGING_IN = 'logging in'
export const LOGIN_SUCCESS = 'login success'
export const LOGIN_FAILURE = 'login failed'
export const REGISTER_SUCCESS = 'register success'
export const REGISTER_FAILURE = 'register failed'
export const GET_SESSION_SUCCESS = 'get session success'
export const GET_SESSION_FAILURE = 'get session failed'
export const LOGOUT_SUCCESS = 'logout success'
export const LOGOUT_FAILURE = 'logout failed'

// robot statuses
export const GET_ROBOTS_SUCCESS = 'get robots success'
export const GET_ROBOTS_FAILURE = 'get robots success'
export const CREATE_ROBOT_SUCCESS = 'create robots success'
export const CREATE_ROBOT_FAILURE = 'create robots failed'
export const DELETE_ROBOT_SUCCESS = 'delete robots success'
export const DELETE_ROBOT_FAILURE = 'delete robots failed'

// votes statuses
export const GET_VOTES_BY_ROBOT_SUCCESS = 'get votes by robot suceess'
export const GET_VOTES_BY_ROBOT_FAILURE = 'get votes by robot failed'
export const GET_USER_VOTE_SUCCESS = 'get user vote success'
export const GET_USER_VOTE_FAILURE = 'get user vote failure'
export const DELETE_VOTE_SUCCESS = 'delete vote success'
export const DELETE_VOTE_FAILURE = 'delete vote failed'
export const CREATE_VOTE_SUCCESS = 'create vote success'
export const CREATE_VOTE_FAILURE = 'create vote failed'