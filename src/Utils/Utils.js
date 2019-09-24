import React from 'react'
import namor from 'namor'
import AppConfig from '../Config/AppConfig'
// import Chance from 'chance'

var AES = require('crypto-js/aes')
var hmacSha256 = require('crypto-js/hmac-sha256')
var sha256 = require('crypto-js/sha256')
var EncUtf8 = require('crypto-js/enc-utf8')

const userPriv = {
  '100': 'Customer',
  '200': 'Merchant Admin',
  '300': 'Partner Admin',
  '400': 'Operator'
}

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  // const statusChance = Math.random()
  // const chance = new Chance()
  const _id = Date().now()
  return {
    _id,
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    // status:
    //   statusChance > 0.66
    //     ? 'relationship'
    //     : statusChance > 0.33
    //       ? 'complicated'
    //       : 'single'
  }
}

export function makeData (len = 5553) {
  return range(len).map(d => {
    return {
      ...newPerson()
      // children: range(10).map(newPerson)
    }
  })
}

export const Logo = () => (
  <div
    style={{
      margin: '1rem auto',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    For more examples, visit {''}
    <br />
    <a href='https://github.com/react-tools/react-table' target='_blank'>
      <img
        src='https://github.com/react-tools/media/raw/master/logo-react-table.png'
        style={{ width: `150px`, margin: '.5em auto .3em' }}
      />
    </a>
  </div>
)

export const Tips = () => (
  <div style={{ textAlign: 'center' }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>
)
export const getAccessToken = () => {
  console.log('getAccessToken')
  const publicToken = window.sessionStorage.getItem(AppConfig.publicToken)
  const sessionToken = window.sessionStorage.getItem(AppConfig.sessionToken)
  const ok = true
  // dont encrypt
  if (ok) return sessionToken

  if (!publicToken || !sessionToken) return ''
  const ciphertext = AES.encrypt(publicToken, sessionToken)
  // const plaintext = ciphertext.toString(EncUtf8)
  // const plaintext = ciphertext.toString(EncUtf8)
  // const test = aesjs.utils.utf8.toBytes('asdfadsfd')
  // const test = sha256(publicToken)
  // console.log('getAccessToken test=', test)
  // console.log('getAccessToken sha256=', test)
  // console.log('getAccessToken plaintext=', plaintext)
  // console.log('getAccessToken ciphertext=', ciphertext)
  // console.log('getAccessToken publicToken=', publicToken)
  // console.log('getAccessToken sessionToken=', sessionToken)
  return ciphertext
  // return AES.decrypt(ciphertext.toString(), sessionToken)
}
export const decryptAt = (msg, key) => {
  console.log('decryptAt')
  const publicToken = window.sessionStorage.getItem(AppConfig.publicToken)
  const sessionToken = window.sessionStorage.getItem(AppConfig.sessionToken)
  if (!publicToken || !sessionToken) return ''
  const str = AES.decrypt(msg, sessionToken)
  var plaintext = str.toString(EncUtf8)
  return plaintext
}
export const getUserPrivName = (uPriv) => {
  return userPriv[uPriv]
}
export const isLoggedIn = (isLoggedInState) => {
  // console.log('isLoggedIn isLoggedInState1===>', isLoggedInState)
  isLoggedInState = isLoggedInState || window.localStorage.getItem('isLoggedIn') || false
  if (isLoggedInState === 'true' || isLoggedInState === true) isLoggedInState = true
  else isLoggedInState = false
  // console.log('isLoggedIn isLoggedInState2===>', isLoggedInState)
  return isLoggedInState
}
export const generateHmac = (msg) => {
  return hmacSha256(msg, 'prismalink2019').toString()
}
export const generateSha256 = (msg) => {
  return sha256(msg).toString()
}
export const generatePayloadTransaction = ({
  pinhmac,
  channelId,
  serviceCode,
  currency,
  transactionNo,
  transactionAmount,
  transactionDate,
  description,
  customerName,
  customerEmail,
  customerPhone,
  key,
  callbackURL,
  merchantName,
  productCode,
  period,
  lang
}) => {
  return {
    pinhmac: pinhmac,
    channelId: 'Majesty0001',
    serviceCode: '2002',
    currency: 'IDR',
    transactionNo,
    transactionAmount,
    transactionDate: '09-08-2019 11:20:30',
    description: 'bayar uang SPP',
    customerName: 'Nofrets Poai',
    customerEmail: 'opetstudio@gmail.com',
    customerPhone: '085342805673',
    key: '5CBE964F5BA21',
    callbackURL: 'https://secure.plink.co.id/event-listener/landingpage?noInv=01082017&tgl=09-08-2019%2011%3A20%3A30&nama=risa%20paramita&noUnit=125&hunian=The%20Majesty&periode=August%202019&total=1000&lang=en',
    merchantName: 'smk',
    productCode: '125',
    period: 'August 2019',
    lang: 'en'
  }
}
