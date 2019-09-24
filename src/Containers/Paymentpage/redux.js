import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {arrayMerge, cleaningObject} from '../../Utils/helper/datamining'
import _ from 'lodash'
import AppConfig from '../../Config/AppConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  paymentpageRequest: ['data'],
  paymentpageRequestPatch: ['data']
})

export const PaymentpageTypes = Types
export default Creators

/* ------------- Initial State ------------- */
let serverDataJsonString = '{}'
if (window.SERVER_DATA !== '' && window.SERVER_DATA !== '__SERVER_DATA__' && window.SERVER_DATA !== '${SERVER_DATA}') {
  serverDataJsonString = window.SERVER_DATA
}
let initialData = AppConfig.env === 'developmentxxx' ? {
  CTRX_ID: '',
  STRX_ID: '',
  CALLBACK_URL: '',
  LAST_NAME: 'Anita',
  FIRST_NAME: 'Anita',
  SHIPPING_ADDRESS: '',
  PAR1: 'Majesty0001',
  PAR2: '2002',
  PAR3: 'IDR',
  PAR4: '31072012',
  PAR5: '2000',
  PAR6: '02-07-2019 13:30:05',
  PAR7: 'pembayaran%20hunian,%20no%20unit%20130',
  PAR8: 'Anita',
  PAR9: 'endah.paramita@prismalink.co.id',
  PAR10: '8949736473',
  PAR11: '',
  PAR12: 'https://secure.plink.co.id/event-listener/landingpage?noInv=31072012',
  MERCHANT_NAME: 'The Majesty',
  PRODUCT_CODE: '20130',
  PERIOD: 'July 2019'
} : JSON.parse(serverDataJsonString || '{}')

export const INITIAL_STATE = Immutable({
  isRequesting: false,
  message: '',
  version: 0,
  ctrxId: initialData.CTRX_ID,
  strxId: initialData.STRX_ID,
  callbackUrl: initialData.CALLBACK_URL,
  lastName: initialData.LAST_NAME,
  firstName: initialData.FIRST_NAME,
  cardNumber: '',
  expireMonth: '',
  expireYear: '',
  cvv: '',
  paymentStatus: '',
  paymentStatusMessage: '',
  isShippingAddress: false,
  shippingAddress: initialData.SHIPPING_ADDRESS,
  par1: initialData.PAR1,
  par2: initialData.PAR2,
  par3: initialData.PAR3,
  par4: initialData.PAR4, // ___PAR4__
  par5: initialData.PAR5,
  par6: initialData.PAR6,
  par7: initialData.PAR7,
  par8: initialData.PAR8,
  par9: initialData.PAR9,
  par10: initialData.PAR10,
  par11: initialData.PAR11,
  par12: initialData.PAR12,
  merchantName: initialData.MERCHANT_NAME,
  productCode: initialData.PRODUCT_CODE,
  period: initialData.PERIOD,
  isLuhnOk: false,
  sof: '',
  dataqr: '',
  dataqrjsonstring: null,
  urlVerifyTransaction: null,
  urlStatusTransaction: null,
  responseStatus: '',
  responseMessage: '',
  responseDescription: ''
})

/* ------------- Selectors ------------- */

export const PaymentpageSelectors = {
  isRequesting: st => st.isRequesting,
  paymentStatus: st => st.paymentStatus,
  paymentStatusMessage: st => st.paymentStatusMessage,
  message: st => st.message,
  callbackUrl: st => st.callbackUrl,
  ctrxId: st => st.ctrxId,
  strxId: st => st.strxId,
  lastName: st => st.lastName,
  firstName: st => st.firstName,
  cardNumber: st => st.cardNumber,
  expireMonth: st => st.expireMonth,
  expireYear: st => st.expireYear,
  cvv: st => st.cvv,
  isLuhnOk: st => st.isLuhnOk,
  isShippingAddress: st => st.isShippingAddress,
  par1: st => st.par1,
  par2: st => st.par2,
  par3: st => st.par3,
  par4: st => st.par4,
  par5: st => st.par5,
  par6: st => st.par6,
  par7: st => st.par7,
  par8: st => st.par8,
  par9: st => st.par9,
  par10: st => st.par10,
  par11: st => st.par11,
  par12: st => st.par12,
  merchantName: st => st.merchantName,
  productCode: st => st.productCode,
  period: st => st.period,
  shippingAddress: st => st.shippingAddress,
  sof: st => st.sof,
  dataqr: st => st.dataqr,
  dataqrjsonstring: st => st.dataqrjsonstring,
  urlVerifyTransaction: st => st.urlVerifyTransaction,
  urlStatusTransaction: st => st.urlStatusTransaction,
  responseStatus: st => st.responseStatus,
  responseMessage: st => st.responseMessage,
  responseDescription: st => st.responseDescription
}

/* ------------- Reducers ------------- */
export const paymentpageReq = (state, query) => {
  query.data.isRequesting = true
  return paymentpageRequest(state, query)
}
export const paymentpageRequest = (state, { data }) => {
  let mergeData = {}
  if (data.paymentStatus) mergeData.paymentStatus = data.paymentStatus
  if (data.paymentStatusMessage) mergeData.paymentStatusMessage = data.paymentStatusMessage
  if (data.ctrxId) mergeData.ctrxId = data.ctrxId
  if (data.strxId) mergeData.strxId = data.strxId
  if (data.message) mergeData.message = data.message
  if (data.callbackUrl) mergeData.callbackUrl = data.callbackUrl
  if (data.firstName) mergeData.firstName = data.firstName
  if (data.lastName) mergeData.lastName = data.lastName
  if (data.cardNumber) mergeData.cardNumber = data.cardNumber
  if (data.expireMonth) mergeData.expireMonth = data.expireMonth
  if (data.expireYear) mergeData.expireYear = data.expireYear
  if (data.isLuhnOk) mergeData.isLuhnOk = data.isLuhnOk
  if (data.cvv) mergeData.cvv = data.cvv
  if (data.shippingAddress) mergeData.shippingAddress = data.shippingAddress
  if (data.hasOwnProperty('isShippingAddress')) mergeData.isShippingAddress = data.isShippingAddress
  if (data.hasOwnProperty('isLuhnOk')) mergeData.isLuhnOk = data.isLuhnOk
  if (data.hasOwnProperty('isRequesting')) mergeData.isRequesting = data.isRequesting
  if (data.hasOwnProperty('sof')) mergeData.sof = data.sof
  if (data.hasOwnProperty('dataqr')) mergeData.dataqr = data.dataqr
  if (data.hasOwnProperty('dataqrjsonstring')) mergeData.dataqrjsonstring = data.dataqrjsonstring
  if (data.hasOwnProperty('urlVerifyTransaction')) mergeData.urlVerifyTransaction = data.urlVerifyTransaction
  if (data.hasOwnProperty('urlStatusTransaction')) mergeData.urlStatusTransaction = data.urlStatusTransaction
  if (data.hasOwnProperty('responseStatus')) mergeData.responseStatus = data.responseStatus
  if (data.hasOwnProperty('responseMessage')) mergeData.responseMessage = data.responseMessage
  if (data.hasOwnProperty('responseDescription')) mergeData.responseDescription = data.responseDescription
  if (data.hasOwnProperty('par4')) mergeData.par4 = data.par4
  if (data.hasOwnProperty('par5')) mergeData.par5 = data.par5
  mergeData.version = state.version + 1
  return state.merge(mergeData)
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PAYMENTPAGE_REQUEST]: paymentpageReq,
  [Types.PAYMENTPAGE_REQUEST_PATCH]: paymentpageRequest
})
