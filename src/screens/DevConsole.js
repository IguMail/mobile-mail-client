import React from "react"
import { Text } from "react-native"
import { Redirect } from 'react-router-native'
import styles from '../theme/styles'
import { Section, Row, AccountHeader, TouchLink } from '../theme'

const debug = require('debug')('chaterr:DevConsole')

const style = {
  ScreenLink: {
    padding: 20
  }
}

const ScreenLink = props => (<Row style={style.ScreenLink}>
    {props.children}
  </Row>)

let redirected = false
const RedirectOnce = props => {
  if (redirected) return null
  redirected = true
  return <Redirect to={props.to} />
}

const DevConsole = props => {

  debug('props', props)

  return (<Section style={{
    ...style.section,
    ...styles.center,
    justifyContent: 'flex-start',
    marginTop: 30
  }}>
    <AccountHeader title={'Dev Console'} />
    <ScreenLink>
      <TouchLink to="/splash"><Text>Splash</Text></TouchLink>
    </ScreenLink>
    <ScreenLink>
      <TouchLink to="/login"><Text>Login</Text></TouchLink>
    </ScreenLink>
    <ScreenLink>
      <TouchLink to="/inbox"><Text>Inbox</Text></TouchLink>
    </ScreenLink>
    <ScreenLink>
      <TouchLink to="/account/add"><Text>Add Account</Text></TouchLink>
    </ScreenLink>
    <ScreenLink>
      <TouchLink to="/account/oauth"><Text>Login</Text></TouchLink>
    </ScreenLink>
    <RedirectOnce to="/account/add" />
  </Section>)
}

export default DevConsole