import React from 'react'
import styles from '../../theme/styles'
import { View, Text, Image } from "react-native"
import { TouchLink } from '../../theme'

const defaultStyle = {
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 30,
    marginRight: 15,
    flex: 1,
    flexDirection: 'row'
  },
  titleContainer: {
    flex: 1
  },
  title: {
    ...styles.fontDefault,
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 0.5,
    color: '#fff'
  },
  fileIconContainer: {
    alignSelf: 'flex-start',
    marginRight: 10
  },
  fileIcon: {
    width: 16,
    height: 20
  },
  downloadIconContainer: {
    alignSelf: 'flex-end',
    marginLeft: 10,
    position: 'absolute',
    right: 0
  },
  downloadIcon: {
    width: 15,
    height: 18
  }
}

const AttachmentLink = props => {
  const { FileIconComponent, DownloadIconComponent } = props
  const { id, fileName } = props.attachment || {}
  let { iconSource, downloadIconSource, style } = props

  style = {
    ...defaultStyle,
    ...(style || {})
  }

  const title = fileName || '[Untitled]'

  iconSource = iconSource || require('../../images/fileWhite.png')
  downloadIconSource = downloadIconSource || require('../../images/icon_ios_import.png')

  const FileIcon = FileIconComponent ? 
    FileIconComponent :
    () => <Image source={iconSource} style={style.fileIcon}/>

  const DownloadIcon = DownloadIconComponent ? 
    DownloadIconComponent :
    () => <Image source={downloadIconSource} style={style.downloadIcon}/>

  const onPress = () => {

  }

  return (<TouchLink style={style.container} to={'/attachment/' + id} onPress={onPress}>
    <View style={style.fileIconContainer}>
      <FileIcon style={style.fileIcon} />
    </View>
    <View style={style.titleContainer}>
      <Text style={style.title}>{title}</Text>
    </View>
    <View style={style.downloadIconContainer}>
      <DownloadIcon style={style.downloadIcon} />
    </View>
  </TouchLink>)
}

export default AttachmentLink
