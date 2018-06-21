import React from 'react';
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import styles from './styles'
import { Section, TouchLink } from './'

const style = { 
  titleContainerStyle: {
    ...styles.center,
  },
  titleStyle: {
    ...styles.fontDefault,
    fontSize: 16,
    fontWeight: "bold",
    color: '#333333'
  },
  containerStyle: {
    ...styles.section,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1
  },
  backButton: {
    color: "#3f8efc"
  },
  iconContainer: {
    position: 'absolute',
    left: 20,
    padding: 10,
    zIndex: 1
  }
}

class AccountHeader extends React.PureComponent {
  render() {
    const { title, containerStyle, titleStyle, backButton } = this.props

    const lines = !Array.isArray(title) ? [ title ] : title

    return (
      <Section style={[style.containerStyle, containerStyle]}>
        {
          backButton && 
          <TouchLink style={style.iconContainer} to={backButton.to || '/'}>
            <Icon 
              name={backButton.name || 'chevron-left'} 
              type={backButton.type || 'feather'}
              color={backButton.color || style.backButton.color} 
              size={backButton.size || 15} 
            />
          </TouchLink>
        }
        <View style={style.titleContainerStyle}>
          {lines.map( (text, i) => (
            <Text key={i} style={[style.titleStyle, titleStyle]}>{text}</Text>
          ))}
        </View>
      </Section>)
  }
}

export default AccountHeader;