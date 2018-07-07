const icon = {
  marginLeft: 10,
  marginRight: 10
}

const styles = {
  footer: {
    padding: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#fff'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  container: {
    send: {
      position: 'absolute', 
      right: 0
    }
  },
  icon: {
    document: {
      ...icon,
      width: 16,
      height: 20
    },
    camera: {
      ...icon,
      width: 23,
      height: 17
    },
    pin: {
      ...icon,
      width: 15,
      height: 23
    },
    picture: {
      ...icon,
      width: 20,
      height: 16
    },
    send: {
      ...icon,
      width: 19,
      height: 20
    },
    reply: {
      ...icon,
      width: 16,
      height: 14
    },
    maximize: {
      ...icon,
      width: 14,
      height: 14
    }
  },
  textInput: {
    flexGrow: 1,
    flex: 1,
    flexBasis: 10,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.58
  }
}

export default styles