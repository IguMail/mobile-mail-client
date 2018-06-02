import React from 'react'
import TouchLink from './TouchLink'

const style = {
  dot: {
    margin: 1
  },
  link: {
    marginLeft: 10
  }
}

const MenuIcon = props => (
  <TouchLink to={props.to} style={style.link}>
      {props.children}
    </TouchLink>
)

export default MenuIcon