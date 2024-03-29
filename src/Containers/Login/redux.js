import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { arrayMerge } from '../../Utils/helper/datamining'
import { isEmpty } from 'ramda'
import Cookies from 'universal-cookie'
import AppConfig from '../../Config/AppConfig'
const cookies = new Cookies()

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginPatch: ['data'],
  loginDoLogin: ['data'],
  loginDoLogout: ['data'],
  loginCheckStatus: ['data'],
  loginDoLoginSuccess: ['data'],
  loginDoLogoutSuccess: ['data'],

  loginRequest: ['data'],
  loginCreate: ['data'],
  loginUpdate: ['data'],
  loginRemove: ['data'],
  loginRemoveSuccess: ['data'],
  loginAll: ['data'],
  loginData: ['data'],
  loginSuccess: ['payload'],
  loginSingleSuccess: ['data'],
  loginUpdateHeader: ['newHeader'],
  loginAllSuccess: ['byId', 'allIds', 'maxModifiedon'],
  loginFailure: ['data'],
  loginStillExist: null,
  loginReset: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  fetching: null,
  payload: null,
  single: null,
  multi: null,
  error: null,
  allIds: [],
  byId: {},
  maxModifiedon: 0,
  isLoggedIn: null,
  token: null,
  expiresIn: 0,
  refreshToken: '',
  scope: '',
  tokenType: '',
  formSubmitMessage: '',

  isRequesting: false,
  responseMessage: '',
  responseCode: '',
  version: 0,
  userFullName: '',
  responseDescription: '',
  userRole: ''
})

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  getData: state => state.data,
  getSingle: state => state.single,
  getDetailById: (state, id) => (state.byId || {})[id],
  getAllIds: state => state.allIds,
  getAllDataArr: state => state.allIds.map(id => (state.byId || {})[id]),
  getMaxModifiedon: state => state.maxModifiedon,
  getById: state => state.byId,
  isLoggedIn: state => state.isLoggedIn,
  getFormSubmitMessage: state => state.formSubmitMessage,
  getError: state => state.error,
  getToken: state => state.token,

  isRequesting: st => st.isRequesting,
  responseMessage: st => st.responseMessage,
  responseCode: st => st.responseCode,
  userFullName: st => st.userFullName,
  responseDescription: st => st.responseDescription,
  userRole: st => st.userRole
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// Or post it, straight out of Redux
export const create = state => state.merge({ fetching: true, payload: null })

// or, Update it.
export const update = state => state.merge({ fetching: true, payload: null })

// or, Delete it.
export const remove = state => {
  return state.merge({ fetching: true })
}

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({
    fetching: false,
    error: null,
    payload,
    isLoggedIn: false,
    single: {},
    token: ''
  })
}
export const removeSuccess = (state, action) => {
  const { payload } = action
  window.localStorage.setItem('isLoggedIn', false)
  return state.merge({
    fetching: false,
    isRequesting: false,
    error: null,
    payload,
    isLoggedIn: false,
    single: {},
    token: ''
  })
}

export const singleSuccess = (state, action) => {
  // console.log('logiiinnnn singleSuccess=>', action)
  // const { payload } = action
  const { data } = action
  const contentDetail = data.contentDetail
  const byId = {}
  const isLoggedIn = !isEmpty(contentDetail.access_token)
  window.localStorage.setItem('isLoggedIn', isLoggedIn)
  // return state.merge({ fetching: false, error: null, payload, single: payload })
  return state.merge({
    fetching: false,
    error: null,
    byId: { ...state.byId, ...byId },
    token: contentDetail.access_token,
    isLoggedIn,
    single: contentDetail,
    formSubmitMessage: data.formSubmitMessage
  })
}

export const updateHeader = (state, action) => {
  const { newHeader } = action
  const isLoggedIn = !isEmpty(newHeader.token) && newHeader.token !== undefined
  // console.log('newHeader', newHeader)
  return state.merge({ token: newHeader.token, isLoggedIn })
}

export const allSuccess = (state, action) => {
  const { byId, allIds, maxModifiedon } = action
  return state.merge({
    fetching: false,
    error: null,
    byId: { ...state.byId, ...byId },
    allIds: arrayMerge([state.allIds, allIds])
  })
}

// Something went wrong somewhere.
export const failure = (state, action) => {
  const { data } = action
  return state.merge({
    fetching: false,
    error: true,
    payload: null,
    formSubmitMessage: data.formSubmitMessage
  })
}
export const reset = state => state.merge(INITIAL_STATE)

// Or just merge a new object
export const data = (state, { data }) => state.merge({ data }, { deep: true })

export const loginDoLogin = (state, { data }) => {
  data.isRequesting = true
  return loginPatch(state, { data })
}
export const loginDoLogout = (state, { data }) => {
  data.isRequesting = true
  return loginPatch(state, { data })
}
export const loginCheckStatus = (state, { data }) => {
  data.isRequesting = true
  return loginPatch(state, { data })
}
export const loginDoLoginSuccess = (state, { data }) => {
  console.log('loginDoLoginSuccess')
  window.localStorage.setItem('isLoggedIn', true)
  window.localStorage.setItem('userRole', data.userRole)
  window.sessionStorage.setItem(AppConfig.sessionToken, data.sessionToken)
  window.sessionStorage.setItem(AppConfig.publicToken, data.publicToken)
  data.isRequesting = false
  data.isLoggedIn = true
  return loginPatch(state, { data })
}
export const loginDoLogoutSuccess = (state, { data }) => {
  console.log('loginDoLogoutSuccess')
  window.localStorage.setItem('isLoggedIn', false)
  window.localStorage.setItem('userRole', '')
  window.sessionStorage.removeItem(AppConfig.sessionToken)
  window.sessionStorage.removeItem(AppConfig.publicToken)
  data.isRequesting = false
  data.isLoggedIn = true
  return loginPatch(state, { data })
}
export const loginPatch = (state, { data }) => {
  let mergeData = {}
  if (data.hasOwnProperty('isRequesting')) mergeData.isRequesting = data.isRequesting
  if (data.hasOwnProperty('responseCode')) mergeData.responseCode = data.responseCode
  if (data.hasOwnProperty('responseMessage')) mergeData.responseMessage = data.responseMessage
  if (data.isLoggedIn) mergeData.isLoggedIn = data.isLoggedIn
  if (data.hasOwnProperty('responseDescription')) mergeData.responseDescription = data.responseDescription
  if (data.hasOwnProperty('userFullName')) mergeData.userFullName = data.userFullName
  if (data.hasOwnProperty('userRole')) mergeData.userRole = data.userRole
  mergeData.version = state.version + 1
  return state.merge(mergeData)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.LOGIN_CHECK_STATUS]: state => state,
  [Types.LOGIN_STILL_EXIST]: state => state,
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_CREATE]: create,
  [Types.LOGIN_UPDATE]: update,
  [Types.LOGIN_REMOVE]: remove,
  [Types.LOGIN_REMOVE_SUCCESS]: removeSuccess,
  [Types.LOGIN_ALL]: request,
  [Types.LOGIN_DATA]: data,
  [Types.LOGIN_UPDATE_HEADER]: updateHeader,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_SINGLE_SUCCESS]: singleSuccess,
  [Types.LOGIN_ALL_SUCCESS]: allSuccess,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGIN_RESET]: reset,

  [Types.LOGIN_PATCH]: loginPatch,
  [Types.LOGIN_DO_LOGIN]: loginDoLogin,
  [Types.LOGIN_DO_LOGIN_SUCCESS]: loginDoLoginSuccess,
  [Types.LOGIN_DO_LOGOUT]: loginDoLogout,
  [Types.LOGIN_DO_LOGOUT_SUCCESS]: loginDoLogoutSuccess,
  [Types.LOGIN_CHECK_STATUS]: loginCheckStatus
})
