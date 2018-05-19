// @flow
import * as React from "react";
import {
  StyleSheet,
  View,
  Image
} from "react-native";
import { Header, Text, Icon } from "react-native-elements";
import { Section, Logo } from './theme'
import styles from './theme/styles'

const CHATTER = 'Chatter'

class App extends React.Component {

  render() {

    const { loaded } = this.props

    const slogan = () => (<View>
      <Text style={styles.slogan}>Email made</Text>
      <Text style={styles.slogan}>simple</Text>
    </View>)

    return ((<Section style={styles.splash}>
        <Logo />
        {loaded && slogan()}
      </Section>))
  }
}

export default App;