import React from "react";
import { View } from "react-native";
import styles from './styles'

class Row extends React.PureComponent {
  render() {
    const { children } = this.props
    return (<View style={styles.row} {...this.props}>{children}</View>)
  }
}

export default Row;
