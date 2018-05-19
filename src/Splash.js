import React from "react";
import { View, Text } from "react-native";
import { LogoText } from './theme'
import styles from './theme/styles'

const CHATTER = 'Chatter'

class Splash extends React.Component {

  render() {

    const { loaded } = this.props

    const slogan = () => (<View>
      <Text style={styles.slogan}>Email made</Text>
      <Text style={styles.slogan}>simple</Text>
    </View>)

    return (<View style={styles.splash}>
      <LogoText />
      {loaded && slogan()}
    </View>)
  }
}

export default Splash;