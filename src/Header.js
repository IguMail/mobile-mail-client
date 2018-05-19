// @flow
import * as React from "react";
import { StyleSheet } from "react-native";
import { Header } from "react-native-elements";

const CHATTER = 'Chatter'

class Header extends React.Component {
  render() {

    return (<Header
      backgroundColor="#fff"
      statusBarProps={{ barStyle:  styles.barStyle}}
      leftComponent={{ icon: styles.leftComponent.icon, color: styles.leftComponent.color }}
      centerComponent={{ text: CHATTER, style: { color: '#3f8efc' } }} // todo: move to css
      rightComponent={{ icon: 'home', color: '#3f8efc' }}
    />)
  }
}

const styles = StyleSheet.create({
  barStyle: 'light-content',
  leftComponent: {
    icon: 'menu',
    color: '#3f8efc'
  }
});

export default Header;
