import React from 'react'
import SideMenu from 'react-native-side-menu'
import SideMenuComponent from './SideMenu'

const debug = require('../lib/debug')('igumail:side-menu')

export default class SideMenuLink extends React.Component {

  constructor () {
    super()
    this.state = {
      isOpen: false
    }
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }

  toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {

    const { account } = this.props

    const onChange = (isOpen) => {
      debug('Menu state change', isOpen)
      this.props.onChange && this.props.onChange(isOpen)
    }

    return (
      <SideMenu
        openMenuOffset={304}
        disableGestures={this.props.disableGestures}
        isOpen={this.props.isOpen}
        onChange={(isOpen) => onChange(isOpen)}
        menu={<SideMenuComponent account={account} />}>
        {this.props.children}
      </SideMenu>
    )
  }
}
