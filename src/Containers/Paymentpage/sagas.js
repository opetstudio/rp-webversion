import { call, put, select } from 'redux-saga/effects'
import PaymentpageActions from './redux'
import { getAttributes, getEntity, getEntityCollection, getEntityBatch } from '../../Transforms/TransformAttributes'
import { merge, path } from 'ramda'
import _ from 'lodash'
import Cookies from 'universal-cookie'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath
// import { showSagaMessage } from '../Translations/SagaMessages'
// import history from '../Services/BrowserHistory'

export const session = state => ({...state.login.single, token: state.login.token, isLoggedIn: state.login.isLoggedIn})
export const sessionToken = state => state.debitonline.sessionToken
export const theData = state => state.product.data
export const theMulti = state => state.product.multi
export const scene = state => state.debitonline.scene
export const transformedData = response => getAttributes(response.data)

export function * paymentpageRequest (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.paymentpageRequest, data.payload, {url: data.url, method: data.method})
  console.log('response=====>', response)
  // JSON.stringify(response)
  // yield put(PaymentpageActions.paymentpageRequestPatch({log: ['hit api request url=> ' + JSON.stringify(response.config.url)]}))
  let message = ''
  // success?
  let responseStatus = ''
  let responseMessage = ''
  let responseDescription = ''
  if (response.ok) {
    responseStatus = path(['responseStatus'], response.data) || ''
    responseMessage = path(['responseMessage'], response.data) || ''
    responseDescription = path(['responseDescription'], response.data) || ''
    // const {byId, allIds, status} = getEntity(response.data)
    // if (response.status === 201) {
    //   const byId = {[response.data._id]: response.data}
    //   const allIds = [response.data._id]
    //   yield put(PaymentpageActions.debitonlineRequestRemovecard({formSubmitMessage: 'success post data', byId, allIds}))
    // } else yield put(PaymentpageActions.debitonlineRequestRemovecardFailed({ formSubmitMessage: 'Failed create data' }))

    message = '00'
    if (data.url === '/card-checking/luhn-validate') {
      // update luhn
      if (response.data.insertStatus === 'VALID') {
        yield put(PaymentpageActions.paymentpageRequestPatch({isRequesting: false, isLuhnOk: true}))
      } else {
        message = response.data.insertStatus
        yield put(PaymentpageActions.paymentpageRequestPatch({isRequesting: false, isLuhnOk: false}))
      }
    }
    if (data.url === '/card-checking/pcs-payment-register') {
      // {"insertStatus":"00","redirectURL":"https://payment.plink.co.id/payment/landing/en/90f1c22d21e20cfe70579d032bbfb463057d8bf9"}
      if (response.data.insertStatus === '00' && response.data.redirectURL) {
        // redirect
        const cookies = new Cookies()
        cookies.set(data.payload.trxid, response.data.id, { path: '/' })
        // yield put(PaymentpageActions.paymentpageRequestPatch({ctrxId: data.payload.trxid, strxId: response.data.id}))
        window.open(response.data.redirectURL, '_self')
        // window.open(response.data.redirectURL, '_blank')
      } else {
        let responseMessage = path(['message'], response.data)
        message = responseMessage || 'Payment Request FAILED'
      }
    }
    if (data.url === '/card-checking/find-id-status') {
    //   "insertStatus": "00",
    // "message": "SUCCESS"
      yield put(PaymentpageActions.paymentpageRequestPatch({paymentStatus: response.data.insertStatus, paymentStatusMessage: response.data.message}))
    }
    if (data.url === '/transaction-api/generate-transaction') {
    //   "insertStatus": "00",
    // "message": "SUCCESS"
      let dataqrjsonstring = path(['dataqrjsonstring'], response.data)
      let urlVerifyTransaction = path(['url'], response.data) || ''
      if (urlVerifyTransaction !== null && urlVerifyTransaction !== '') window.open(urlVerifyTransaction, '_self')
      yield put(PaymentpageActions.paymentpageRequestPatch({paymentStatus: response.data.insertStatus, paymentStatusMessage: response.data.message, dataqrjsonstring, urlVerifyTransaction}))
    }
    if (data.url === '/transaction-api/do-payment') {
    //   "insertStatus": "00",
    // "message": "SUCCESS"
      let urlStatusTransaction = path(['urlStatusTransaction'], response.data) || ''
      if (urlStatusTransaction !== null && urlStatusTransaction !== '') window.open(urlStatusTransaction, '_self')
      yield put(PaymentpageActions.paymentpageRequestPatch({paymentStatus: response.data.insertStatus, paymentStatusMessage: response.data.message, urlStatusTransaction}))
    }
    // if (
    //   data.url === '/InitMDOApiV2/rest/validate'
    //   // data.url === '/CardVerifyGenerateOtpApi/rest/cardverifyRs' ||
    //   // data.url === '/MdoOtpVerificationApi/rest/validateOtpRs' ||
    //   // data.url === '/SetLimitTrxCustomerAPI/rest/setMaximumDailyTransactionCustomer'
    // ) {
    //   let sessionToken = path(['sessionToken'], response.data)
    //   let latestActvLogId = path(['latestActvLogId'], response.data)
    //   let ecommRefNo = path(['ecommRefNo'], response.data)
    //   let mercRefNo = path(['mercRefNo'], response.data)
    //   let username = path(['username'], response.data)
    //   yield put(PaymentpageActions.paymentpageRequestPatch({sessionToken, latestActvLogId, ecommRefNo, mercRefNo, username}))
    // }
    // if (data.url === '/CardVerifyGenerateOtpApi/rest/cardverifyRs') {
    //   let cardVerifiedToken = path(['cardVerifiedToken'], response.data)
    //   let cardNo = path(['cardNo'], response.data)
    //   let cardExpiryDate = path(['cardExpiryDate'], response.data)
    //   yield put(PaymentpageActions.paymentpageRequestPatch({cardVerifiedToken, cardExpiryDate, cardNo}))
    // }
    // if (data.url === '/MdoOtpVerificationApi/rest/validateOtpRs') {
    //   let otpVerifiedToken = path(['otpVerifiedToken'], response.data)
    //   yield put(PaymentpageActions.paymentpageRequestPatch({otpVerifiedToken}))
    // }
    // if (data.url === '/MdoOtpVerificationApi/rest/validateOtpRs') {
    //   let otpVerifiedToken = path(['otpVerifiedToken'], response.data)
    //   let cardToken = path(['cardToken'], response.data)
    //   let cardTokenId = path(['cardTokenId'], response.data)
    //   yield put(PaymentpageActions.paymentpageRequestPatch({otpVerifiedToken, cardToken, cardTokenId}))
    // }
  } else {
    responseStatus = response.problem
    responseMessage = response.problem
    responseDescription = response.problem
    // let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    // if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    // // if (path(['originalError', 'response', 'status'], response) === 500) return yield put(LoginActions.loginRemoveSuccess({}))
    // yield put(PaymentpageActions.debitonlineRequestRemovecardFailed({ formSubmitMessage: validationMessages }))
    message = response.problem
    if (data.url === '/generate-transaction') {
      alert('generate-transaction gagal. service belum siap.')
    }
  }
  yield put(PaymentpageActions.paymentpageRequestPatch({message, isRequesting: false, responseStatus, responseMessage, responseDescription}))
  // const sc = yield select(scene)

  // if (data.nextScene && message === '00') {
  //   // if (data.nextScene === 'scenePaymentProcessPage' && message === '00') {
  //   //   yield put(PaymentpageActions.paymentpageRequestPatch({log: ['hit api payment']}))
  //   //   // MdoPaymentApi
  //   // }
  //   yield put(PaymentpageActions.paymentpageRequestPatch({message, isRequesting: false, scene: [...sc, data.nextScene]}))
  // } else yield put(PaymentpageActions.paymentpageRequestPatch({message, isRequesting: false}))
  // if (data.callback) yield call(data.callback, message)
}
