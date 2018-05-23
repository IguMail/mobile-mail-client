import React from "react";
import { Text, View, Image } from "react-native";
import styles from './styles'
import { Section, TouchLink } from './'

class InboxHeader extends React.PureComponent {
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
          marginTop: 30,
          marginBottom: 30,
          paddingRight: 20,
          paddingLeft: 20,
          alignItems: 'center',
          width: '100%',
          flexDirection: 'row'
        }
      }
    }
    const { style, title } = {
      ...defaults,
      ...this.props
    }

    const lines = !Array.isArray(title) ? [ title ] : title

    return (<Section style={style.containerStyle}>
      <TouchLink to="/dev">
        <Image source={require('../images/icon-home.png')} style={{
          width: 19,
          height: 15
        }} />
      </TouchLink>
      <View style={{ 
        flex: 1,
        flexGrow: 1, 
        alignItems: 'center',
        justifyContent: 'center' 
      }}>
        {lines.map( (text, i) => (<Text key={i} style={style.titleStyle}>{text}</Text>))} 
      </View>
      <Text style={{
        ...style.titleStyle,
        color: "#3f8efc"
      }}>Edit</Text>
    </Section>)
  }
}

export default InboxHeader;