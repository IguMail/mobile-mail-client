import React from 'react'
import { View, Image, TextInput } from 'react-native'
import styles from '../styles'
import { Section } from '../'

const debug = require('debug')('chaterr:Message:Footer')

const icon = {
  marginLeft: 10,
  marginRight: 10
}

const defaults = {
  style: {
    containerStyle: {
      width: '100%',
      backgroundColor: '#fff',
      height: 71
    },
    footer: {
      padding: 10,
      flexDirection: 'column',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#fff'
    },
    row: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center'
    },
    icon: {
      document: {
        ...icon,
        width: 16,
        height: 20
      },
      camera: {
        ...icon,
        width: 23,
        height: 17
      },
      pin: {
        ...icon,
        width: 15,
        height: 23
      },
      picture: {
        ...icon,
        width: 20,
        height: 16
      },
      send: {
        ...icon,
        width: 19,
        height: 20,
        position: 'absolute', 
        right: 0
      },
      reply: {
        ...icon,
        width: 16,
        height: 14
      },
      maximize: {
        ...icon,
        width: 14,
        height: 14
      }
    },
    textInput: {
      flexGrow: 1,
      flex: 1,
      flexBasis: 10,
      fontSize: 14,
      lineHeight: 18,
      letterSpacing: 0.58
    }
  }
}

class InboxFooter extends React.PureComponent {

  onSubmitEditing(event) {
    debug('onSubmitEditing', event)
    // TODO: send the email
  }

  render() {
    
    const { style } = {
      ...defaults,
      ...this.props
    }

    if (global.PLATFORM === 'web') {
      style.footer.position = 'fixed'
    }

    const textInputDefaultText = 'Reply...'

    return (<Section style={style.containerStyle}>
      <View style={style.footer}>
        <View style={style.row}>
          <Image source={require('../../images/icon_ios_reply_filled.png')} style={style.icon.reply} />
          <TextInput 
            style={[styles.fontDefault, style.textInput]} 
            placeholder={textInputDefaultText} 
            onSubmitEditing={event => this.onSubmitEditing(event)} />
          <Image source={require('../../images/maximize.png')} style={style.icon.maximize} />
        </View>
        <View style={{
          ...style.row,
          marginTop: 10
        }}>
          <Image source={require('../../images/document.png')} style={style.icon.document} />
          <Image source={require('../../images/camera.png')} style={style.icon.camera} />
          <Image source={require('../../images/icon_ios_pin.png')} style={style.icon.pin} />
          <Image source={require('../../images/picture.png')} style={style.icon.picture} />
          <Image source={require('../../images/send.png')} style={style.icon.send} />
        </View>
      </View>
    </Section>)
  }
}

export default InboxFooter