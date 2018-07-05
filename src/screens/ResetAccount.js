import React from 'react'
import { observer, inject } from 'mobx-react'
import { View, Text, Button, Alert } from 'react-native'
import { LogoText } from '../theme'
import createLocalStorage from '../service/LocalStorage'

const style = {
  ResetAccount: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50
  }
}

@inject('getAccount')
@observer
class ResetAccount extends React.Component {

  render() {

    const cancel = () => {
      this.props.history.push('/inbox')
    }

    const reset = () => {
      alert('Reset the account')
      const storage = createLocalStorage()
      storage.clear()
      this.props.getAccount.loaded = false
    }

    const confirm = () => {
      Alert.alert(
        'Account Reset',
        'Are you sure you want to reset the account?',
        [
          {text: 'Cancel', onPress: () => cancel(), style: 'cancel'},
          {text: 'Yes, Reset the account!', onPress: () => reset()},
        ],
        { cancelable: false }
      )
    }

    return (<View style={style.ResetAccount}>
      <LogoText />
      <Text>
        Are you sure you want to clear the current user account and reset the app?
      </Text>
      <Button onPress={() => cancel()} title="Return to Inbox" />
      <Button onPress={() => confirm()} title="Reset Account" />
    </View>)
  }
}

export default ResetAccount