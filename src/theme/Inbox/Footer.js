import React from "react";
import { View, Image } from "react-native";
import styles from '../styles'
import { Section } from '../'

const debug = require('../../lib/debug')('igumail:InboxFooter')

const defaults = {
  style: {
    titleStyle: {
      ...styles.fontDefault,
      fontSize: 16,
      fontWeight: "bold",
      color: '#333333',
    },
    containerStyle: {
      justifyContent: 'flex-end',
      width: '100%',
      flex: 1,
      backgroundColor: "#fff"
    },
    footer: {
      width: '100%',
      padding: 20,
      flexDirection: 'row',
      shadowColor: "rgba(51, 51, 51, 0.1)",
      shadowOffset: {
        width: 0,
        height: -2
      },
      shadowRadius: 2,
      shadowOpacity: 1,
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: '#fff'
    }
  }
}

class InboxFooter extends React.PureComponent {
  render() {
    
    const { style } = {
      ...defaults,
      ...this.props
    }

    if (global.PLATFORM === 'web') {
      style.footer.position = 'fixed'
    }

    debug('platform', global.PLATFORM)

    return (<Section style={style.containerStyle}>
      <View style={style.footer}>
        <View style={{}}>
          <Image source={require('../../images/userGroupManWoman.png')} style={{
            width: 25,
            height: 20
          }} />
        </View>
        <View style={{ 
          flex: 1,
          flexGrow: 1, 
          alignItems: 'center',
          justifyContent: 'center' 
        }}>
          <Image source={require('../../images/icon_ios_edit.png')} style={{
            width: 23,
            height: 22
          }} />
        </View>
        <View>
        <Image source={require('../../images/iconCogwheel.png')} style={{
            width: 20,
            height: 20
          }} />
        </View>
      </View>
    </Section>)
  }
}

export default InboxFooter;
