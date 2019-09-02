import { call, put, select } from 'redux-saga/effects'
import QrcodeActions from './redux'
import { getAttributes, getEntity, getEntityCollection, getEntityBatch } from '../../Transforms/TransformAttributes'
import { merge, path } from 'ramda'
import _ from 'lodash'
import Cookies from 'universal-cookie'
// import { showSagaMessage } from '../Translations/SagaMessages'
// import history from '../Services/BrowserHistory'

export const session = state => ({...state.login.single, token: state.login.token, isLoggedIn: state.login.isLoggedIn})
export const sessionToken = state => state.debitonline.sessionToken
export const theData = state => state.product.data
export const theMulti = state => state.product.multi
export const scene = state => state.debitonline.scene
export const transformedData = response => getAttributes(response.data)

export function * qrcodeRequest (api, action) {
  // console.log('qrcodeRequest<====')
  const { data } = action
  // make the call to the api
  const response = yield call(api.getQrCodeImage, data.payload, {url: data.url, method: data.method})
  // console.log('response===>', response)
  let qrimage = ''
  let message = ''
  // success?
  if (response.ok) {
    message = '00'
    qrimage = response.data
  } else {
    message = response.problem
  }
  yield put(QrcodeActions.qrcodeRequestPatch({message, isRequesting: false, qrimage}))
}
