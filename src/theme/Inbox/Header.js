import React from 'react'
import { Text, View, Image } from 'react-native'
import { observer, inject } from 'mobx-react'
import styles from '../styles'
import { Section, TouchLink } from '../'

const debug = require('debug')('chaterr:Header')

@inject('sideMenu')
@observer
class InboxHeader extends React.Component {
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
          marginBottom: 10,
          paddingRight: 20,
          paddingLeft: 20,
          alignItems: 'center',
          width: '100%',
          flexDirection: 'row'
        },
        homeIcon: {
          width: 19,
          height: 15
        }
      }
    }
    const { style, title } = {
      ...defaults,
      ...this.props
    }

    const lines = !Array.isArray(title) ? [ title ] : title
    
    const toggleSideMenu = () => {
      const sideMenu = this.props.sideMenu
      sideMenu.isOpen ? sideMenu.close() : sideMenu.open()
    }

    return (<Section style={style.containerStyle}>
      <TouchLink onPress={() => {
        debug('clicked sidemenu toggle')
        toggleSideMenu()
      }}>
        <Image source={require('../../images/icon-home.png')} style={style.homeIcon} />
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

export default InboxHeader