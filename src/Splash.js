// @flow
import * as React from "react";
import {
  StyleSheet,
  View,
  Image
} from "react-native";
import { Header, Text, Icon } from "react-native-elements";
import { Font } from 'expo';

const CHATTER = 'Chatter'

class App extends React.Component {

  state = {
    loaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Lato': require('../assets/fonts/Lato-Regular.ttf'),
    })
    this.setState({ loaded: true })
  }

  render() {

    const { loaded } = this.state

    if (!loaded) {
      return (<View><Text>Loading Mail...</Text></View>)
    }

    return ((<View style={styles.main}>
        <Image
          source={require('./images/LogoText.png')}
          style={styles.logo}
        />
        <Text style={styles.slogan}>Email made</Text>
        <Text style={styles.slogan}>simple</Text>
      </View>))
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    alignItems: 'center', 
    justifyContent: 'center'
  },
  logo: {
    width: 256, 
    height: 74,
    marginBottom: 20
  },
  slogan: {
    fontFamily: "Lato",
    fontSize: 20,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.71,
    textAlign: "center",
    color: "#9aa7af"
  }
});

export default App;