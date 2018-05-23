import React from 'react'
import { View } from 'react-native'
import Dot from './Dot'
import MenuIcon from './MenuIcon'

const style = {
  dot: {
    margin: 1
  },
  link: {
    marginLeft: 10
  }
}

const MenuIconDots = props => (
  <MenuIcon to={props.to} style={style.link}>
    <Dot style={style.dot} />
    <Dot style={style.dot} />
    <Dot style={style.dot} />
  </MenuIcon>
)

export default MenuIconDots