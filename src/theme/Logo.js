import React from "react";
import { Image } from "react-native";
import styles from './styles'

class Logo extends React.PureComponent {
  render() {
    return (<Image
      source={require('../images/LogoText.png')}
      style={styles.logo}
    />)
  }
}

export default Logo;