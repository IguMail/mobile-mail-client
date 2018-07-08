import styles from './'

const style = {
  MenuComponent: {
    backgroundColor: '#fcfcfc', 
    paddingTop: 50,
    flex: 1
  },
  header: {
    paddingLeft: 20,
    paddingBottom: 20,
    flexDirection: 'row'
  },
  accountInfo: {
    paddingLeft: 20,
    height: 60
  },
  status: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 10
  },
  statusText: {
    ...styles.fontDefault,
    paddingRight: 2,
    color: '#333',
  },
  statusIconContainer: {
    marginTop: 2
  },
  statusIcon: {
    color: '#9aa7af',
  },
  nameText: {
    ...styles.fontDefault,
    fontWeight: 'bold',
    color: '#333',
    paddingTop: 5
  },
  menuList: {},
  menuItem: {
    backgroundColor: '#fcfcfc',
    flexDirection: 'row',
    padding: 12,
    paddingLeft: 18,
    alignItems: 'center'
  },
  menuItemSelected: {
    backgroundColor: 'rgba(154, 167, 175, 0.6)'
  },
  menuItemPrimary: {
    backgroundColor: '#3f8efc',
    flexDirection: 'row',
    padding: 12,
    paddingLeft: 18,
    marginBottom: 12,
    alignItems: 'center'
  },
  menuItemPrimaryText: {
    ...styles.fontDefault,
    fontWeight: '500',
    marginLeft: 10,
    color: '#fff'
  },
  menuItemIcon: {
    color: '#3f8efc'
  },
  menuItemIconSelected: {
    color: '#fff'
  },
  menuItemText: {
    ...styles.fontDefault,
    fontWeight: '500',
    marginLeft: 10,
    color: '#767676'
  },
  menuItemTextSelected: {
    color: '#fff'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
    overflow: 'hidden'
  },
  avatarImage: {
    width: 60,
    height: 60
  },
  linkIconContainer: {
    ...styles.center,
    alignItems: 'flex-end',
    paddingRight: 20
  },
  linkIcon: {
    color: '#9aa7af'
  }
}

export default style
