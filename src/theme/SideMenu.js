import React from 'react'
import { observer, inject } from 'mobx-react'
import { View, Text, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import TouchLink from './TouchLink'
import style from './styles/sideMenu'
import Avatar from './Avatar'

//const debug = require('../lib/debug')('chaterr:side-menu')

const CREATE_ACCOUNT = 'Create an account on Chaterr'

const allMailMenuItem = {
  title: 'All Email',
  iconName: 'email',
  to: '/inbox'
}

const staticMenuItems = [
  {
    title: 'Settings',
    iconName: 'settings',
    to: '/'
  },
  {
    title: 'Invite Friends',
    iconName: 'account-multiple-plus',
    iconType: 'material-community',
    to: '/'
  },
  {
    title: 'Help',
    iconName: 'help',
    to: '/'
  },
  {
    title: 'Trash',
    iconName: 'trash',
    iconType: 'font-awesome',
    to: '/'
  },
  {
    title: 'Logout',
    iconName: 'power-off',
    iconType: 'font-awesome',
    to: '/'
  }
]

const Status = props => (
  <View style={style.status}>
    <Text style={style.statusText}>{props.status}</Text>
    <Icon name="chevron-down" type="feather" color={style.statusIcon.color} size={15} containerStyle={style.statusIconContainer} />
  </View>
)

const Header = props => (
  <TouchLink style={style.header} to="/">
    <Avatar text={props.name} style={style.avatar}>
      {props.source.uri 
        && <Image source={props.source} style={style.avatarImage} />}
    </Avatar>
    <View style={style.accountInfo}>
      <Text style={style.nameText}>{props.name}</Text>
      <Status status={props.status} />
    </View>
    <View style={style.linkIconContainer}>
      <Icon name="chevron-right" type="feather" color={style.linkIcon.color} size={30} />
    </View>
  </TouchLink>
)

const MenuItem = props => (
  <View style={[style.menuItem, props.selected && style.menuItemSelected]}>
    <Icon 
      name={props.iconName} 
      type={props.iconType} 
      color={(props.selected ? style.menuItemIconSelected.color : style.menuItemIcon.color)} 
      size={20} 
    />
    <Text 
      style={[style.menuItemText,  props.selected && style.menuItemTextSelected]}>
      {props.title}
    </Text>
  </View>
)

@inject('sideMenu')
@observer
class SideMenu extends React.Component {

  get menuItems() {
    const { account } = this.props
    const accounts = [
      {
        title: account.name || account.email,
        iconName: 'account-circle',
        to: '/inbox', // '/inbox/' + account.id,
        selected: true
      }
    ]
    return [allMailMenuItem, ...accounts, ...staticMenuItems]
  }


  render() {

    const { account, sideMenu } = this.props

    const onPress = () => {
      sideMenu.isOpen = false
    }

    return (
      <View style={style.MenuComponent}>
        <Header 
          source={{uri: account.photo}} 
          name={account.name || account.email} 
          status={account.status}
        />
        <TouchLink style={style.menuItemPrimary} to="/account/add">
          <Icon name="inbox" color="#fff" size={20} />
          <Text style={style.menuItemPrimaryText}>{CREATE_ACCOUNT}</Text>
        </TouchLink>
        <View style={style.menuList}>
        {
          this.menuItems.map((l, i) => (
            <TouchLink 
              to={l.to} 
              key={i}
              onPress={() => onPress()}>
              <MenuItem
                iconName={l.iconName}
                iconType={l.iconType}
                title={l.title}
                selected={l.selected}
              />
            </TouchLink>
          ))
        }
        </View>
      </View>
    )
  }
}

  export default SideMenu