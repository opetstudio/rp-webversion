import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
// import {arrayMerge, cleaningObject} from '../../Utils/helper/datamining'
// import _ from 'lodash'
import AppConfig from '../../Config/AppConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  qrcodeRequest: ['data'],
  qrcodeRequestPatch: ['data']
})

export const QrcodeTypes = Types
export default Creators

/* ------------- Initial State ------------- */
let initialData = AppConfig.env === 'development' ? {
  CTRX_ID: ''
} : window

export const INITIAL_STATE = Immutable({
  isRequesting: false,
  userid: null,
  qrimage: null
})

/* ------------- Selectors ------------- */

export const QrcodeSelectors = {
  isRequesting: st => st.isRequesting,
  getUserid: st => st.userid,
  getQrimage: st => st.qrimage
}

/* ------------- Reducers ------------- */
export const qrcodeReq = (state, query) => {
  query.data.isRequesting = true
  return qrcodeRequest(state, query)
}
export const qrcodeRequest = (state, { data }) => {
  let mergeData = {}
  if (data.userid) mergeData.userid = data.userid
  if (data.qrimage) mergeData.qrimage = data.qrimage
  if (data.hasOwnProperty('isRequesting')) mergeData.isRequesting = data.isRequesting
  // mergeData.version = state.version + 1
  return state.merge(mergeData)
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.QRCODE_REQUEST]: qrcodeReq,
  [Types.QRCODE_REQUEST_PATCH]: qrcodeRequest
})
