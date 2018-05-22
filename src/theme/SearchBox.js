import React from "react"
import { View, Text, Image, TextInput } from "react-native"
import inbox from '../theme/styles/inbox'
import styles from '../theme/styles'
import { SearchBar, Icon } from 'react-native-elements'

const style = {
  ...inbox
}

const SearchBox = props => {

  return <View style={style.search}>
      <SearchBar placeholder="Search"
      containerStyle={{
        backgroundColor: '#fcfcfc',
        borderBottomColor: '#fcfcfc',
        borderTopColor: '#fcfcfc',
        flex: 1
      }}
      inputStyle={{
        ...styles.fontDefault,
        backgroundColor: '#fff'
      }}
      placeholderTextColor="#9aa7af" />
    </View>
}

export default SearchBox