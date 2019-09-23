import { takeLatest, all } from 'redux-saga/effects'
// You'll need to alter this file when you go to connect the api for realsies. Add
// back the lines ending with with a # (and of course, remove the #) :)
import API from '../Services/Api'
import RehydrationServices from '../Services/RehydrationServices'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import AppConfig from '../Config/AppConfig'

// Types /* ------------- Types ------------- */
import { LoginTypes } from '../Containers/Login/redux'
import { PaymentpageTypes } from '../Containers/Paymentpage/redux'
import { QrcodeTypes } from '../Containers/Qrcode/redux'
import { StartupTypes } from '../Redux/StartupRedux'
// Sagas /* ------------- Sagas ------------- */
import { paymentpageRequest } from '../Containers/Paymentpage/sagas'
import { qrcodeRequest } from '../Containers/Qrcode/sagas'
import { startup } from './StartupSagas'
import { loginDoLogin, loginCheckStatus, removeLogin } from '../Containers/Login/sagas'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const baseUrl = AppConfig.env === 'development' ? '/' : 'https://api1.opetstudio.com/'
const baseUrl =
  AppConfig.env === 'development'
    // ? 'http://127.0.0.1:8080/MdoSwaggerUi/rest/simulatorBackend/'
    ? 'http://localhost:8081/'
    // ? 'https://api1.opetstudio.com/'
    : '/MdoSwaggerUi/rest/simulatorBackend/'
    // : 'https://api1.opetstudio.com/'
// const baseUrl = 'http://localhost:8080/'
const host = baseUrl + ''
// const host = baseUrl + 'api/service/v1/dashboard/api/'
// const host = 'http://localhost:8099/api/service/v1/dashboard/api/'
// const baseUrl = '/'
// const baseUrl = 'http://localhost:8099/'
// const host = 'http://localhost:8090/api/'
const api = DebugConfig.useFixtures ? FixtureAPI : API.create(host)
// const apiPaymentpage = API.create(AppConfig.env === 'development' ? 'https://secure.plink.co.id/' : '/')

// java:mbdd-mserchant|docker:prismalink/dashboard-api:1|k8s:prismalink-dashboard-api
// const dashboardApi = API.create(AppConfig.env === 'development' ? 'http://localhost:8762/dashboard-api/' : 'http://localhost:8762/dashboard-api/')
const dashboardApi = API.create(AppConfig.env === 'development' ? 'http://localhost:8762/dashboard-api/' : 'https://api.erevnaraya.com/dashboard-api/')

// const apiPaymentpage = API.create(AppConfig.env === 'development' ? 'http://localhost:8762/paymentpage/' : 'http://localhost:8762/paymentpage/')
const apiPaymentpage = API.create(AppConfig.env === 'development' ? 'http://localhost:8762/paymentpage/' : 'https://api.erevnaraya.com/paymentpage/')
// const apiQrcode = API.create(AppConfig.env === 'development' ? 'http://localhost:8762/' : 'http://localhost:8762/')
// const apiQrcode = API.create(AppConfig.env === 'development' ? 'http://localhost:8762/' : 'http://localhost:8762/')
const apiQrcode = API.create(AppConfig.env === 'development' ? 'http://localhost:8282/' : 'https://api.erevnaraya.com/')
// const apiQrcode = API.create(AppConfig.env === 'development' ? 'http://localhost:8762/' : 'https://api.erevnaraya.com/')
// const apiPaymentpage = API.create(AppConfig.env === 'development' ? 'http://202.158.24.186:8380/' : '/')
// const baseApi = DebugConfig.useFixtures ? FixtureAPI : API.create(baseUrl)
/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(LoginTypes.LOGIN_REMOVE, removeLogin, dashboardApi),
    takeLatest(LoginTypes.LOGIN_DO_LOGIN, loginDoLogin, dashboardApi),
    takeLatest(LoginTypes.LOGIN_CHECK_STATUS, loginCheckStatus, dashboardApi),
    takeLatest(PaymentpageTypes.PAYMENTPAGE_REQUEST, paymentpageRequest, apiPaymentpage),
    takeLatest(QrcodeTypes.QRCODE_REQUEST, qrcodeRequest, apiQrcode),
    takeLatest(StartupTypes.STARTUP, startup, api)
    // some sagas receive extra parameters in addition to an action
    // takeLatest(UserTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
