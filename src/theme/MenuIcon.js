import React from 'react'
import TouchLink from './TouchLink'

const style = {
  link: {
    paddingLeft: 10
  }
}

const MenuIcon = props => (
  <TouchLink to={props.to} style={{...props.style, ...style.link}}>
      {props.children}
    </TouchLink>
)

export default MenuIcon
