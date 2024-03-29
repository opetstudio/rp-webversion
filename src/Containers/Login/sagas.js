import { call, put, select } from 'redux-saga/effects'
import LoginActions from './redux'
// import UserActions from '../User/redux'
// import ParticipantActions from '../Participant/redux'
// import ClassesActions from '../Classes/redux'
// import ConferenceActions from '../Conference/redux'
// import ClassparticipantActions from '../Classparticipant/redux'
// import BadgeActions from '../Badge/redux'
// import RoleActions from '../Role/redux'
import {
  getAttributes,
  mapAttributes,
  updateMulti,
  insertMulti
} from '../../Transforms/TransformAttributes'
import { merge, path } from 'ramda'
import {getAccessToken, decryptAt} from '../../Utils/Utils'
// import { showSagaMessage } from '../Translations/SagaMessages'
// import history from '../Services/BrowserHistory'

export const session = state => ({
  ...state.login.single,
  token: state.login.token,
  isLoggedIn: state.login.isLoggedIn
})
export const theData = state => state.login.data
export const theMulti = state => state.login.multi
export const theUserPrefs = state => state.user.preferences
export const transformedData = response => getAttributes(response.data)

export function * getLogin (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getLogin, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    const { contentDetail } = response.data
    yield put(LoginActions.loginSingleSuccess(contentDetail))
    // yield put(LoginActions.loginSingleSuccess(transformedData(response)))
    // yield put(LoginActions.loginData(transformedData(response)))
    // history.push('/path/to/some/url' + data.id, { type: 'login'  })
  } else {
    yield put(LoginActions.loginFailure())
  }
}


export function * postLogin (api, action) {
  const { data } = action
  const s = yield select(session)
  // make the call to the api
  const response = yield call(api.postLogin, data, { session: s })
  console.log('response login=>', response)

  let responseCode = path(['data', 'responseCode'], response)
  let responseMessage = path(['data', 'responseMessage'], response)

  // success?
  if (response.ok) {
    // console.log('response==>', response)
    // const token = path(['authorization'], response.headers)
    // const userDetail = {}
    // const userDetail = path(['o', 'resp', 'userDetail'], response.data)
    // var accessToken = path(['access_token'], response.data)
    // var expiresIn = path(['expires_in'], response.data)
    // var refreshToken = path(['refresh_token'], response.data)
    // var scope = path(['scope'], response.data)
    // var tokenType = path(['token_type'], response.data)

    yield put(
      LoginActions.loginSingleSuccess({
        contentDetail: response.data,
        formSubmitMessage: 'success login'
      })
    )
    // window.location.href = '/home'
    // window.open('/home', '_self')
    // yield put(LoginActions.loginData(transformedData(response)))
    // const multi = yield select(theMulti)
    // yield put(
    //   LoginActions.loginAllSuccess(
    //     insertMulti(transformedData(response), multi)
    //   )
    // )
    // yield call(showSagaMessage, 'saved')
  } else {
    let validationMessages = path(['data', 'detail'], response)
    // if (path(['originalError', 'response', 'status'], response) === 500) return yield put(LoginActions.loginRemoveSuccess({}))
    // yield put(BadgeActions.badgeCreateFailed({ formSubmitMessage: validationMessages }))
    yield put(
      LoginActions.loginFailure({ formSubmitMessage: validationMessages })
    )
    // yield call(showSagaMessage, 'error')
  }
  yield put(LoginActions.loginPatch({isRequesting: false, responseCode, responseMessage}))
}

export function * updateLogin (api, action) {
  const { data } = action
  // make the call to the api
  const params = yield select(theData)
  const response = yield call(api.updateLogin, merge(data, params))

  // success?
  if (response.ok) {
    yield put(LoginActions.loginSingleSuccess(transformedData(response)))
    yield put(LoginActions.loginData(transformedData(response)))
    const multi = yield select(theMulti)
    yield put(
      LoginActions.loginAllSuccess(
        updateMulti(transformedData(response), multi)
      )
    )
    // yield call(showSagaMessage, 'saved')
  } else {
    yield put(LoginActions.loginFailure())
    // yield call(showSagaMessage, 'error')
  }
}

function * doLogout () {
  yield put(LoginActions.loginRemoveSuccess({}))
  // yield put(UserActions.userReset())
  // yield put(RoleActions.roleReset())
  // yield put(ParticipantActions.participantReset())
  // yield put(ClassesActions.classesReset())
  // yield put(ConferenceActions.conferenceReset())
  // yield put(BadgeActions.badgeReset())
  // yield put(ClassparticipantActions.classparticipantReset())
}
export function * removeLogin (api, action) {
  const { data } = action
  const s = yield select(session)
  // // make the call to the api
  const response = yield call(api.removeLogin, data, { session: {token_type: 'Bearer', access_token: getAccessToken()} })
  console.log('response logout==>', response)
  // // success?
  // if (response.ok) {
  //   let status = path(['data', 'responseCode'], response)
  //   let responseMessage = path(['data', 'responseMessage'], response)
  //   if (status === 'MBDD00') {
  yield call(doLogout)
  // yield put(LoginActions.loginPatch({isRequesting: false}))
  //     // yield put(UserActions.userReset())
  //     // yield put(ParticipantActions.participantReset())
  //   } else {
  //     alert(responseMessage)
  //   }
  //   // yield call(RehydrationServices, data)
  // } else {
  //   //   yield put(LoginActions.loginFailure())
  //   alert('logout failed, please try again.')
  //   // yield call(doLogout)
  // }
}

export function * getLogins (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getLogins, data)

  // success?
  if (response.ok) {
    const { byId, allIds, maxModifiedon } = response.data
    yield put(LoginActions.loginAllSuccess(byId, allIds, maxModifiedon))
    // history.push('/path/to/some/url')
  } else {
    yield put(LoginActions.loginFailure())
  }
}

export function * loginDoLogin (api, action) {
  console.log('loginDoLogin')
  const { data } = action
  const response = yield call(api.loginDoLogin, data, {url: data.url, method: data.method})
  console.log('response loginDoLogin=>', response)
  let responseCode = path(['data', 'responseCode'], response)
  let responseMessage = path(['data', 'responseMessage'], response)
  let sessionToken = path(['data', 'sessionToken'], response)
  let publicToken = path(['data', 'publicToken'], response)
  let userFullName = path(['data', 'user', 'userFullname'], response)
  let responseDescription = path(['data', 'responseDescription'], response) || responseMessage
  let userRole = path(['data', 'user', 'userRole'], response) || '100'
  if (!response.ok) {
    responseMessage = response.problem
    responseDescription = responseDescription || responseMessage
    // return yield put(LoginActions.loginPatch({isRequesting: false, responseCode, responseMessage, responseDescription, userFullName}))
  }
  if (responseCode === 'MBDD00') {
    return yield put(LoginActions.loginDoLoginSuccess({sessionToken, publicToken, responseCode, responseMessage, responseDescription, userFullName, userRole}))
  } else {
    return yield put(LoginActions.loginPatch({isRequesting: false, responseCode, responseMessage, responseDescription, userFullName, userRole}))
  }
}
export function * loginCheckStatus (api, action) {
  const { data } = action
  const response = yield call(api.getLoginStatus, data, { session: {token_type: 'Bearer', access_token: getAccessToken()} })
  // const response = yield call(api.getLoginStatus, data, { session: {token_type: 'Bearer', access_token: decryptAt(getAccessToken())} })
  // success?
  let responseDescription = path(['data', 'responseDescription'], response)
  if (response.ok && responseDescription !== 'USER IS LOGIN') {
    console.log('LOGOUT')
    // yield call(doLogout)
    yield put(LoginActions.loginDoLogoutSuccess({}))
    return yield put(LoginActions.loginPatch({isRequesting: false, isLoggedIn: false}))
  }
  yield put(LoginActions.loginPatch({isRequesting: false}))
}
