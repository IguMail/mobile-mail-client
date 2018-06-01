import React from 'react'
import { View, Image, TextInput, TouchableHighlight } from 'react-native'
import styles from '../styles'
import { Section } from '../'
import footerStyle from '../styles/message/footer'

const debug = require('debug')('chaterr:Message:Footer')

const defaults = {
  style: {
    ...footerStyle
  }
}

class InboxFooter extends React.PureComponent {

  componentDidMount() {
    debug('mounted InboxFooter', this.props)
  }

  state = {
    textInputValue: ''
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

    return (<Section style={style.containerStyle}>
      <View style={style.footer}>
        <View style={style.row}>
          <Image source={require('../../images/icon_ios_reply_filled.png')} style={style.icon.reply} />
          <TextInput 
            value={this.state.textInputValue}
            style={[styles.fontDefault, style.textInput]} 
            placeholder={textInputDefaultText}
            onSubmitEditing={event => this.onSubmitEditing(event)}
            onChangeText={(textInputValue) => this.setState({textInputValue})}
            blurOnSubmit={false}
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
    </Section>)
  }
}

export default InboxFooter