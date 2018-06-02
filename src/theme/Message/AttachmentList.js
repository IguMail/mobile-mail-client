import React from 'react'
import { View } from "react-native"
import AttachmentLink from '../../theme/Message/AttachmentLink'
import AttachmentImageLink from '../../theme/Message/AttachmentImageLink'

const debug = require('debug')('chaterr:Message:AttachmentList')

const defaultStyle = {
  container: {
    borderRadius: 5,
    backgroundColor: '#95a4ad',
    flexShrink: 1
  },
  attachmentContainer: {
  }
}

const AttachmentList = props => {
  const { attachments } = props
  let { style } = props

  debug('attachments', attachments)

  style = {
    ...defaultStyle,
    ...style
  }

  return (<View style={style.container}>
    {attachments.map(attachment => {
      return (<View key={attachment.id} style={style.attachmentContainer}>
        {attachment.contentType.match(/^image\//) ? 
          <AttachmentImageLink attachment={attachment} /> : 
          <AttachmentLink attachment={attachment} />
        }
      </View>)
    })}
  </View>)
}

export default AttachmentList