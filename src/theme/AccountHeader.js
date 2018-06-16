import React from "react";
import { Text } from "react-native";
import styles from './styles'
import { Section } from './'

class AccountHeader extends React.PureComponent {
  render() {
    const { props } = this
    const defaults = {
      style: { 
        titleStyle: {
          ...styles.fontDefault,
          fontSize: 16,
          fontWeight: "bold",
          color: '#333333'
        },
        containerStyle: {
          ...styles.section,
          alignItems: 'center'
        }
      }
    }
    const { style, title } = {
      ...defaults,
      ...props
    }

    const lines = !Array.isArray(title) ? [ title ] : title

    return (<Section style={[style.containerStyle, props.containerStyle]}>
        {lines.map( (text, i) => (
          <Text key={i} style={[style.titleStyle, props.titleStyle]}>{text}</Text>
        ))}
      </Section>)
  }
}

export default AccountHeader;