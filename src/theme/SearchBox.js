import React from "react"
import { View, Text, Image, TextInput } from "react-native"
import inbox from '../theme/styles/inbox'

const style = {
  ...inbox
}

const SearchBox = props => {

  return <View style={style.search}>
      <Image source={require('../images/search.png')} style={{
        width: 16,
        height: 16,
        marginRight: 7
      }} />
      <TextInput placeholder="Search" style={{
        color: "#9aa7af"
      }} 
      placeholderTextColor="#9aa7af" />
    </View>
}

export default SearchBox