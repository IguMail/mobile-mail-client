import React from 'react'
import { observer, inject } from 'mobx-react'
import { View, Text, Image } from 'react-native'
import { Icon, TouchLink, Avatar } from './'
import style from './styles/sideMenu'

const debug = require('../lib/debug')('chaterr:side-menu')

const CREATE_ACCOUNT = 'Create an account on Chaterr'
const ADD_MAIL_ACCOUNT = 'Link another Mail Account'

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

  componentDidMount() {
    if (this.props.sideMenu.error) return
    this.props.account.fetchMailAccounts()
      .catch(error => {
        debug('Error fetching accounts', error)
        this.props.sideMenu.error = error
      })
  }

  getListWithUniqueKey(list, key) {
    const values = list.map(item => item[key])
    return [...new Set(values)].map( 
      (item, i, self) => list[values.indexOf(item)]
    )
  }

  get menuItems() {
    const { account, sideMenu } = this.props
    const selected = sideMenu.selected
    const addAccounts = account.accounts.map( ({ user }) => {
      return {
        title: user.email,
        email: user.email,
        iconName: 'account-circle',
        to: '/inbox',
        selected: selected && selected.email === user.email
      }
    })
    const accounts = this.getListWithUniqueKey(addAccounts, 'title')

    debug('account.accounts', account.accounts, 'addAccounts', addAccounts, 'sideMenu', sideMenu)
    return [allMailMenuItem, ...accounts, ...staticMenuItems]
  }

  renderCreateAccount() {
    return (
      <TouchLink style={style.menuItemPrimary} to="/user/create">
        <Icon name="inbox" color="#fff" size={20} />
        <Text style={style.menuItemPrimaryText}>{CREATE_ACCOUNT}</Text>
      </TouchLink>
    )
  }

  renderAddMailAccount() {
    return (
      <TouchLink style={style.menuItemPrimary} to="/account/add">
        <Icon name="inbox" color="#fff" size={20} />
        <Text style={style.menuItemPrimaryText}>{ADD_MAIL_ACCOUNT}</Text>
      </TouchLink>
    )
  }

  render() {

    const { account, sideMenu } = this.props

    debug('sidemenu', this.props)

    const onPress = item => {
      sideMenu.selected = item
      sideMenu.isOpen = false
    }
    
    const displayStyle = !sideMenu.isOpen && { display: 'none' }

    return (
      <View style={[style.MenuComponent, displayStyle ]}>
        <Header 
          source={{uri: account.photo}} 
          name={account.name || account.email} 
          status={account.status}
        />
        {
          !account.hasRemoteAccount() ?
          this.renderCreateAccount() :
          this.renderAddMailAccount()
        }
        <View style={style.menuList}>
        {
          this.menuItems.map((l, i) => (
            <TouchLink 
              to={l.to} 
              key={i}
              onPress={() => onPress(l)}>
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