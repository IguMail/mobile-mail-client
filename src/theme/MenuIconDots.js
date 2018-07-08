import React from 'react'
import { View } from 'react-native'
import Dot from './Dot'
import MenuIcon from './MenuIcon'

const style = {
  dot: {
    margin: 1
  },
  link: {
    paddingLeft: 10
  }
}

const MenuIconDots = props => (
  <MenuIcon to={props.to} style={{...props.style, ...style.link}}>
    <View>
      <Dot style={style.dot} />
      <Dot style={style.dot} />
      <Dot style={style.dot} />
    </View>
  </MenuIcon>
)

export default MenuIconDots
