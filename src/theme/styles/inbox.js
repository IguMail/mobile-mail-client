import styles from './base'

const inbox = {
  screen: {
    marginTop: 0,
    backgroundColor: '#fcfcfc'
  },
  full: {
    flex: 1
  },
  priorityDot: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  MessageList: {
    marginBottom: 60,
    marginTop: 0,
    flex: 1
  },
  MessageListEmpty: {
    ...styles.center,
    flex: 1
  },
  MessageLink: {
    paddingTop: 20,
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
    flex: 1,
    marginLeft: 30,
    paddingRight: 30,
    marginBottom: 0,
    marginTop: 0,
    paddingTop: 0,
    alignItems: 'center'
  },
  SwipeIconText: {
    // fontFamily: "Montserrat", // TODO: Add font
    fontSize: 10,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.36,
    textAlign: "center",
    color: "#3f8efc",
    marginTop: 9
  }
}

export default inbox