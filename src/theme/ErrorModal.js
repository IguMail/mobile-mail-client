import React from 'react'
import { View, Text, Modal } from 'react-native'
import { Button } from 'react-native-elements'
import styles from '../theme/styles'

const ErrorModal = props => (
<Modal
  style={{
    ...styles.center
  }}
  animationType="slide"
  transparent={false}
  visible={true}>
  <View style={{padding: 50}}>
    <View>
      <Text style={{ padding: 20 }}>{props.errorMsg}</Text>
      <Button
        title="Close"
        buttonStyle={styles.btnPrimary}
        onPress={props.close}
      />
    </View>
  </View>
</Modal>)

export default ErrorModal