import styles from './base'

const screenBackgroundColor = '#fcfcfc'
const scrollBackgroundColor = '#f7f8f9'
const messageFromColor = '#333333'
const messageSubjectColor = '#9aa7af'
const messageBorderBottomColor = '#eee'
const messageTimeColor = '#9aa7af'
const swipeIconTextColor = '#3f8efc'

const inbox = {
  screen: {
    marginTop: 0,
    backgroundColor: screenBackgroundColor
  },
  container: {
    ...styles.center,
    justifyContent: 'flex-start',
    flex: 1
  },
  full: {
    height: '100%'
  },
  scrollView: {
    backgroundColor: scrollBackgroundColor,
    flex: 1,
    width: '100%'
  },
  priorityDot: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  MessageList: {
    marginBottom: 60,
    marginTop: 0,
    width: '100%'
  },
  MessageListEmpty: {
    ...styles.center,
    width: '100%',
    height: '100%'
  },
  MessageLink: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: messageBorderBottomColor,
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
    fontWeight: 'bold',
    color: messageFromColor
  },
  messageTextTime: {
    ...styles.fontDefault,
    fontSize: 12,
    letterSpacing: 0.43,
    color: messageTimeColor
  },
  messagetextSubject: {
    ...styles.fontDefault,
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 0.5,
    color: messageSubjectColor,
    marginTop: 5.4,
    paddingRight: 10
  },
  search: {
    flexDirection: 'row',
    marginLeft: 30,
    paddingRight: 30,
    marginBottom: 0,
    marginTop: 0,
    paddingTop: 0,
    alignItems: 'center'
  },
  SwipeIconText: {
    // fontFamily: 'Montserrat', // TODO: Add font
    fontSize: 10,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.36,
    textAlign: 'center',
    color: swipeIconTextColor,
    marginTop: 9
  }
}

export default inbox
