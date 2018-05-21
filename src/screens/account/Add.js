import React from "react";
import { View, Text, Image } from "react-native";
import { Section, Row, AccountHeader } from '../../theme'
import styles from '../../theme/styles'

const style = {
  google: {
    width: 120,
    height: 40
  },
  yahoo: {
    width: 120,
    height: 28
  },
  outlook: {
    width: 149,
    height: 31
  },
  icloud: {
    width: 147,
    height: 45
  },
  exchange: {
    width: 138,
    height: 30
  },
  service: {
    paddingTop: 60
  },
  section: {
    marginTop: 60
  },
  authServiceLink: {
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    width: 245,
    alignItems: 'center', 
  },
  dot: {
    width: 9.2,
    height: 9,
    backgroundColor: "#9aa7af",
    borderStyle: "solid",
    borderWidth: 0.8,
    borderColor: "#979797",
    borderRadius: 100,
    margin: 7.7
  }
}

const AuthServiceLink = (props) => (<Row style={style.authServiceLink}>
    {props.children}
  </Row>)

class AddAccount extends React.Component {

  render() {

    return (<Section style={{
      ...style.section,
      ...styles.center,
      justifyContent: 'flex-start'
    }}>

      <AccountHeader title={['Add', 'Account']} />

      <AuthServiceLink>
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
        <AccountHeader title={['Add', 'Another Account']} />
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

    </Section>)
  }
}

export default AddAccount;