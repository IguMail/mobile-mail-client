import styles from './base'
import inbox from './inbox'

const conversation = {
  ...inbox,
  MessageList: {
    ...inbox.MessageList,
    marginBottom: 60,
    marginTop: 20
  },
  MessageLink: {
    ...inbox.MessageLink,
    borderBottomWidth: 0,
    paddingTop: 10,
    paddingBottom: 0
  },
  messageTextFrom: {
    color: "#333333",
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0.44,
    color: "#474747"
  },
  messagetextSubject: {
    ...inbox.messagetextSubject,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.5,
    textAlign: "left",
    color: "#333333",
    padding: 0,
    marginTop: 0
  },
  messageTextTime: {
    ...inbox.messageTextTime,
    padding: 8,
  },
  messageBody: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    minHeight: 48
  },
  replyIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 10,
  },
  arrowDown: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: 10
  },
  attachments: {
    marginTop: 15
  }
}

export default conversation