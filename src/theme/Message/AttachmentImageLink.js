import React from 'react'
import { View } from "react-native"
import { TouchLink } from '../../theme'
import ResponsiveImage from '../../theme/ResponsiveImage'

const defaultStyle = {
  container: {
    padding: 1,
    flexDirection: 'row'
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 5
  }
}

const AttachmentImageLink = props => {
  const { id, url  } = props.attachment || {}
  let { style } = props

  style = {
    ...defaultStyle,
    ...(style || {})
  }

  const onPress = () => {}

  return (<TouchLink style={style.container} to={'/attachment/' + id} onPress={onPress}>
    <View style={style.imageContainer}>
      <ResponsiveImage source={{ uri: url }} style={style.images} />
    </View>
  </TouchLink>)
}

export default AttachmentImageLink