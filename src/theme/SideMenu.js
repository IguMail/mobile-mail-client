import React from 'react'
import { View, Text } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import SideMenu from 'react-native-side-menu'
import TouchLink from './TouchLink'
import { withRouter } from 'react-router-native'
import styles from './styles'

const debug = require('debug')('chaterr:side-menu')

const style = {
  MenuComponent: {
    flex: 1, 
    backgroundColor: '#efefef', 
    paddingTop: 50
  },
  header: {
    ...styles.fontDefault,
    paddingLeft: 50
  }
}

const list = [
  {
    name: 'Splash',
    subtitle: 'View Splash Screen',
    to: '/splash'
  },
  {
    name: 'Login',
    subtitle: 'View Login Screen',
    to: '/login'
  },
  {
    name: 'Inbox',
    subtitle: 'View Inbox Screen',
    to: '/inbox'
  },
  {
    name: 'Account',
    subtitle: 'Add Account Screen',
    to: '/account/add'
  }
]

const MenuComponent = props => (<View style={style.MenuComponent}>
    <Text style={style.header}>Testing Menu</Text>
    <List containerStyle={{marginBottom: 20}}>
    {
      list.map((l, i) => (
        <TouchLink to={l.to}>
          <ListItem
            roundAvatar
            avatar={l.avatar_url}
            key={i}
            title={l.name}
            subtitle={l.subtitle}
          />
        </TouchLink>
      ))
    }
    </List>
  </View>)

export default class SideMenuComponent extends React.Component {

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

    const onChange = (isOpen) => {
      debug('Menu state change', isOpen)
      this.props.onChange && this.props.onChange(isOpen)
    }

    return (
      <SideMenu
        disableGestures={this.props.disableGestures}
        isOpen={this.props.isOpen}
        onChange={(isOpen) => onChange(isOpen)}
        menu={<MenuComponent />}>
        {this.props.children}
      </SideMenu>
    )
  }
}