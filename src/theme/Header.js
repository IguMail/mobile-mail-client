// @flow
import * as React from "react";
import { Header } from "react-native-elements";

const CHATTER = 'Chatter'

class ThemeHeader extends React.Component {
  render() {
    return (<Header
      backgroundColor="#fff"
      statusBarProps={{ barStyle: options.barStyle}}
      leftComponent={{ icon: options.leftComponent.icon, color: options.leftComponent.color }}
      centerComponent={{ text: CHATTER, style: { color: '#3f8efc' } }} // todo: move to css
      rightComponent={{ icon: 'home', color: '#3f8efc' }}
    />)
  }
}

const options = {
  barStyle: 'light-content',
  leftComponent: {
    icon: 'menu',
    color: '#3f8efc'
  }
}

export default ThemeHeader;
