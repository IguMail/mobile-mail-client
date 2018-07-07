import React from 'react'
import { View, Image, TextInput, TouchableHighlight, Keyboard } from 'react-native'
import styles from '../styles'
import footerStyle from '../styles/message/footer'

const debug = require('../../lib/debug')('chaterr:Message:Footer')

const defaults = {
  style: {
    ...footerStyle
  }
}

class InboxFooter extends React.Component {

  state = {
    textInputValue: ''
  }

  componentDidMount() {
    debug('mounted InboxFooter', this.props)
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  _keyboardDidShow () {
    debug('Keyboard Shown');
    if (this.props && this.props.keyboardDidShow) {
      this.props.keyboardDidShow()
    }
  }

  _keyboardDidHide () {
    debug('Keyboard Hidden');
    if (this.props && this.props.keyboardDidHide) {
      this.props.keyboardDidHide()
    }
  }

  onSubmitEditing(event) {
    debug('onSubmitEditing', event)
    const text = this.state.textInputValue
    this.props.onSubmitEditing(text)
    this.setState({textInputValue: ''})
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

    return (
      <View style={style.footer}>
        <View style={style.row}>
          <Image source={require('../../images/icon_ios_reply_filled.png')} style={style.icon.reply} />
          <TextInput 
            value={this.state.textInputValue}
            style={[styles.fontDefault, style.textInput]} 
            placeholder={textInputDefaultText}
            onSubmitEditing={event => this.onSubmitEditing(event)}
            onChangeText={(textInputValue) => this.setState({textInputValue})}
            blurOnSubmit
          />
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
          <TouchableHighlight onPress={event => this.onSubmitEditing(event)} style={style.container.send}>
            <Image source={require('../../images/send.png')} style={style.icon.send} />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

export default InboxFooter