import React, { Component } from 'react'
// import Navigation from '../Navigation/SwaggerNavigation'
import Navigation from '../Navigation/PaymentpageNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import {AppSelectors} from '../Redux/AppRedux'
import ReduxPersist from '../Config/ReduxPersist'
import { IntlProvider, addLocaleData } from 'react-intl'
// import en from 'react-intl/locale-data/en'
// import id from 'react-intl/locale-data/id'
import enTranslationMessages from '../Translations/en.json'
import idTranslationMessages from '../Translations/id.json'

import enLocaleData from 'react-intl/locale-data/en'
import idLocaleData from 'react-intl/locale-data/id'

export const localeData = [
  enLocaleData,
  idLocaleData
]

localeData.forEach(locale => addLocaleData(locale))

// addLocaleData([...en])

export const appLocales = ['en', 'id']

export const DEFAULT_LOCALE = 'en'

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages) : {}
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key]
    return Object.assign(formattedMessages, { [key]: formattedMessage })
  }, {})
}

export const translationMessages = {
  en: enTranslationMessages,
  id: idTranslationMessages
  // id: formatTranslationMessages('en', enTranslationMessages),
  // id: formatTranslationMessages('id', enTranslationMessages)
  // You can add other languages here.
}

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    // this.props.fetchUser({id: this.props.loginToken})
  }

  render (xmessages) {
    let lang = this.props.lang || 'id'
    // console.log('tessss=======lang=', lang)
    let messages = {}
    if (translationMessages.hasOwnProperty(lang)) {
      messages = translationMessages[lang]
    }
    return (
      <IntlProvider locale={lang} messages={messages}>
        <Navigation checkLogedStatus={this.props.getLoginStatus} />
      </IntlProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loginToken: 'xxx',
    lang: AppSelectors.lang(state.app)
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
  getLoginStatus: query => {}
  // fetchUser: (query) => dispatch(UserActions.userRequest(query))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer)
