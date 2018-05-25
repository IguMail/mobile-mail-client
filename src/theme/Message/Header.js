import React from "react";
import { Text, View, Image } from "react-native";
import styles from '../styles'
import { Section, TouchLink } from '../'
import MenuIcon from '../MenuIcon'
import MenuIconDots from '../MenuIconDots'

class MessageHeader extends React.PureComponent {
  render() {
    const defaults = {
      style: { 
        titleStyle: {
          ...styles.fontDefault,
          fontSize: 16,
          fontWeight: "bold",
          color: '#333333',
        },
        containerStyle: {
          paddingTop: 30,
          paddingBottom: 20,
          paddingRight: 20,
          paddingLeft: 20,
          alignItems: 'center',
          width: '100%',
          flexDirection: 'row',
          backgroundColor: "#fcfcfc",
          shadowColor: "rgba(0, 0, 0, 0.1)",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowRadius: 4,
          shadowOpacity: 1
        }
      }
    }
    const { style, title } = {
      ...defaults,
      ...this.props
    }

    const lines = !Array.isArray(title) ? [ title ] : title

    return (<Section style={style.containerStyle}>
      <TouchLink to="/inbox">
        <Image source={require('../../images/next.png')} style={{
          width: 11,
          height: 18
        }} />
      </TouchLink>
      <View style={{ 
        flex: 1,
        flexGrow: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20 
      }}>
        {lines.map( (text, i) => (<Text key={i} style={style.titleStyle}>{text}</Text>))} 
      </View>
      <MenuIcon to="/">
        <Image source={require('../../images/search.png')} style={{
          width: 16,
          height: 16
        }} />
      </MenuIcon>
      <MenuIcon to="/">
        <Image source={require('../../images/starIcon.png')} style={{
          width: 20,
          height: 19
        }} />
      </MenuIcon>
      <MenuIcon to="/">
        <Image source={require('../../images/archiveIcon.png')} style={{
          width: 17,
          height: 16
        }} />
      </MenuIcon>
      <MenuIconDots to="/" />
    </Section>)
  }
}

export default MessageHeader;