import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import AppConfig from '../Config/AppConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  init: null
})

export const AppTypes = Types
export default Creators

/* ------------- Initial State ------------- */

// let initialData = AppConfig.env === 'development' ? window : window
let initialData = AppConfig.env === 'development' ? {
  LANG: 'en'
} : window

// console.log('initialData===', initialData.LANG)
export const INITIAL_STATE = Immutable({
  lang: initialData.LANG
})

/* ------------- Selectors ------------- */
export const AppSelectors = {
  lang: st => {
    // console.log('huffff111===', initialData.LANG)
    if (st.lang !== '__LANG__' && st.lang !== '') return st.lang
    // console.log('huffff')
    return 'id'
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INIT]: () => {}
})
