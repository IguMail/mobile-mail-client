import React from 'react'
import { View, Image } from 'react-native'
import { Route } from 'react-router-native'
import { Section, Row, AccountHeader, TouchLink } from '../../theme'
import AddAccountOAuth from './AddOAuth'
import AddAccountCustom from './AddCustom'
import style from '../../theme/styles/account/add'

const AuthServiceLink = (props) => (<TouchLink style={style.authServiceLink} to={props.to}>
    {props.children}
  </TouchLink>)

const AuthServices = props => (
  <Section style={style.container}>

      <AccountHeader title={['Select the account that you wish to', 'link']} />

      <AuthServiceLink to="/account/add/oauth/google">
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
        <TouchLink to="/account/add/custom">
          <AccountHeader title={['Add', 'Another Account']} titleStyle={style.headerTitle} />
        </TouchLink>
      </Row>

      <Row style={{
        ...style.authServiceLink,
        borderBottomWidth: 0,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <View style={style.dot}></View>
        <View style={style.dot}></View>
        <View style={style.dot}></View>
        <View style={{
          ...style.dot,
          backgroundColor: '#f7f7f7'
        }}></View>
      </Row>

    </Section>
)

class AddAccount extends React.Component {

  render() {

    return (
      <View>
        <Route path="/account/add" component={AuthServices} exact />
        <Route path="/account/add/custom" component={AddAccountCustom} />
        <Route path="/account/add/oauth" component={AddAccountOAuth} />
      </View>
    )
  }
}

export default AddAccount;
