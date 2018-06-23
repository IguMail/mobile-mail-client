import React from "react"
import { View, Text } from "react-native"
import { Redirect } from 'react-router-native'
import styles from '../theme/styles'
import { Section, Row, AccountHeader, TouchLink } from '../theme'

const debug = require('../lib/debug')('chaterr:DevConsole')

const style = {
  container: {
    marginTop: 30
  },
  ScreenLink: {
    padding: 20
  },
  links: {
    alignItems: 'center'
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

  return (<Section style={style.container}>
    <AccountHeader title={'Dev Console'} backButton={{ to: '/' }} />
    <View style={style.links}>
      <ScreenLink>
        <TouchLink to="/splash"><Text>Splash</Text></TouchLink>
      </ScreenLink>
      <ScreenLink>
        <TouchLink to="/intro"><Text>Intro</Text></TouchLink>
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
        <TouchLink to="/account/oauth"><Text>OAuth</Text></TouchLink>
      </ScreenLink>
      <ScreenLink>
        <TouchLink to="/account/register"><Text>Register</Text></TouchLink>
      </ScreenLink>
    </View>
    <RedirectOnce to="/" />
  </Section>)
}

export default DevConsole