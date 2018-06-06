import React from "react";
import { Text, View, Image } from "react-native";
import styles from '../styles'
import { Section, TouchLink } from '../'
import MenuIcon from '../MenuIcon'
import MenuIconDots from '../MenuIconDots'

const defaults = {
  style: {
    titleContainer: { 
      flex: 1,
      flexGrow: 1, 
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
      paddingBottom: 20
    },
    title: {
      ...styles.fontDefault,
      fontSize: 16,
      fontWeight: "bold",
      color: '#333333',
    },
    containerStyle: {
      paddingTop: 10,
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
    },
    link: {
      padding: 20
    },
    lastLink: {
      paddingRight: 20
    }
  }
}

class MessageHeader extends React.PureComponent {
  render() {
    const { style, title } = {
      ...defaults,
      ...this.props
    }

    const lines = !Array.isArray(title) ? [ title ] : title

    return (<Section style={style.containerStyle}>
      <TouchLink to="/inbox" style={style.link}>
        <Image source={require('../../images/next.png')} style={{
          width: 11,
          height: 18
        }} />
      </TouchLink>
      <View style={style.titleContainer}>
        {lines.map( (text, i) => (<Text key={i} style={style.title}>{text}</Text>))} 
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
      <MenuIconDots to="/"  style={style.lastLink} />
    </Section>)
  }
}

export default MessageHeader;