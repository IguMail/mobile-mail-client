import React from "react";
import { View } from "react-native";
import styles from './styles'

class Section extends React.PureComponent {
  render() {
    const { children } = this.props
    return (<View style={styles.section} {...this.props}>{children}</View>)
  }
}

export default Section;