import React from 'react'
import styles from '../../theme/styles'
import { View, Text, Button, Image } from "react-native"
import { Section, Row, TouchLink } from '../../theme'
import ResponsiveImage from '../../theme/ResponsiveImage'
import MailApi from '../../store/MailApi'
import config from '../../config'

const debug = require('debug')('chaterr:Message/AttachmentImage')

const mailApi = new MailApi('gabe@fijiwebdesign.com')
mailApi.setApiUrl(config.api.url)

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
  const { id, fileName  } = props.attachment || {}
  let { style } = props

  style = {
    ...defaultStyle,
    ...(style || {})
  }

  const title = fileName || '[Untitled]'
  debug('MailApi', mailApi)

  const imageUrl = mailApi.attachment(id).request.url.href

  debug('imageUrl', imageUrl)

  const onPress = () => {}

  return (<TouchLink style={style.container} to={'/attachment/' + id} onPress={onPress}>
    <View style={style.imageContainer}>
      <ResponsiveImage source={{ uri: imageUrl }} />
    </View>
  </TouchLink>)
}

export default AttachmentImageLink