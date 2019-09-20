// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'
import {generateHmac} from '../../Utils/Utils'

export const create = api => ({
  loginDoLogin: (data, opt) => {
    // api.setHeader('authorization', opt.session.token)
    let body = {email: data.userid, password: data.password}
    console.log('body==>', JSON.stringify(body))
    api.setHeader('mac', generateHmac(JSON.stringify(body)))
    const resp = api.post('/plink/login', {email: data.userid, password: data.password})
    return resp
  },
  postLogin: (data, opt) => {
    console.log('postLogin data', data)
    // api.setHeader('authorization', opt.session.token)
    const resp = api.post('/plink/login', data)
    return resp
  },
  getLogin: data => api.get('/logins/' + data.id),
  getLogins: ({ apiName, baseUrl, newerModifiedon }) => {
    if (baseUrl) api.setBaseURL(baseUrl)
    return api.get(apiName || '/logins/', { newerModifiedon })
  },
  updateLogin: data => api.patch('/logins/' + data.id, { login: data }),
  removeLogin: (data, opt) => {
    console.log('removeLogin invoked')
    api.setHeader('mac', '6905fad8847d8548e225e1701ada9f502741e0f6c3fd68697017e5c06b7ff733')
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get('/plink/logout')
  },
  getLoginStatus: (data, opt) => {
    // const auth = opt.session.token_type + ' ' + opt.session.access_token
    // console.log('auth===>', auth)
    api.setHeader('Content-Type', 'application/json')
    api.setHeader('Accept', 'application/json')
    // api.setHeader('Cookie', 'XSRF-TOKEN=asdfadsf;')
    // api.setHeader('testing', 'asdfadf')
    api.setHeader(
      AppConfig.authHeader,
      opt.session.token_type + ' ' + opt.session.access_token
    )
    return api.get('/plink/islogin')
  }
})
