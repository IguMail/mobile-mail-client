import styles from './base'

const inbox = {
  screen: {
    marginTop: 0,
    backgroundColor: '#fcfcfc'
  },
  priorityDot: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  MessageList: {
    marginBottom: 60
  },
  MessageLink: {
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
    alignItems: 'flex-start',
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row'
  },
  messageTextContainer: {
    marginLeft: 13,
    flex: 1
  },
  messageTextHeader: {
    flexDirection: 'row'
  },
  messageTextFrom: {
    ...styles.fontDefault,
    fontWeight: "bold",
    color: "#333333"
  },
  messageTextTime: {
    ...styles.fontDefault,
    fontSize: 12,
    letterSpacing: 0.43,
    color: "#9aa7af"
  },
  messagetextSubject: {
    ...styles.fontDefault,
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 0.5,
    color: "#9aa7af",
    marginTop: 5.4,
    paddingRight: 10
  },
  search: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: 30,
    paddingRight: 30,
    height: 20,
    alignItems: 'center'
  }
}

export default inbox