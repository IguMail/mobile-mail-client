import React from 'react'
import { View, Image } from 'react-native'
import { Route, withRouter, Switch } from 'react-router-native'
import { Section, Row, AccountHeader, TouchLink } from '../../theme'
import CreateUserOAuth from './CreateOAuth'
import CreateUserCustom from './CreateCustom'
import style from '../../theme/styles/account/add'

const AuthServiceLink = (props) => (<TouchLink style={style.authServiceLink} to={props.to}>
    {props.children}
  </TouchLink>)

const AuthServices = props => (
  <Section>

      <AccountHeader title={['Select the account that you wish to', 'link']} />

      <AuthServiceLink to="/intro/user/create/oauth">
        <Image
          source={require('../../images/Google.png')}
          style={style.google}
        />
      </AuthServiceLink>
      <AuthServiceLink>
        <Image
          source={require('../../images/Yahoo.png')}
          style={style.yahoo}
        />
      </AuthServiceLink>
      <AuthServiceLink>
        <Image
          source={require('../../images/Outlook.png')}
          style={style.outlook}
        />
      </AuthServiceLink>
      <AuthServiceLink>
        <Image
          source={require('../../images/Icloud.png')}
          style={style.icloud}
        />
      </AuthServiceLink>
      <AuthServiceLink>
        <Image
          source={require('../../images/Exchange.png')}
          style={style.exchange}
        />
      </AuthServiceLink>

      <Row style={{
        ...style.authServiceLink,
        borderBottomWidth: 0,
        marginTop: 30
      }}>
        <TouchLink to="/intro/user/create/custom">
          <AccountHeader title={['Add', 'Another Account']} titleStyle={style.headerTitle} />
        </TouchLink>
      </Row>

    </Section>
)

export default class CreateUser extends React.Component {

  render() {

    const CreateUserCustomRoute = withRouter(CreateUserCustom)
    const CreateUserOAuthRoute = withRouter(CreateUserOAuth)

    return (
      <View style={style.container}>
        <Switch>
          <Route path="/intro/user/create/custom" component={CreateUserCustomRoute} />
          <Route path="/intro/user/create/oauth" component={CreateUserOAuthRoute} />
          <Route path="/" component={AuthServices} />
        </Switch>
      </View>
    )
  }
}