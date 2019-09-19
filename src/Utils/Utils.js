import React from 'react'
import namor from 'namor'
import AppConfig from '../Config/AppConfig'
// import Chance from 'chance'

var AES = require('crypto-js/aes')
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
