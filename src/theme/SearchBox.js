import React from "react"
import { View } from "react-native"
import inbox from '../theme/styles/inbox'
import styles from '../theme/styles'
import { SearchBar } from 'react-native-elements'

const style = {
  ...inbox
}

const SearchBox = props => {

  return <View style={style.search}>
      <SearchBar
        placeholder="Search"
        placeholderTextColor="#9aa7af"
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
      />
    </View>
}

export default SearchBox