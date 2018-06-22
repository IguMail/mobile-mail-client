import styles from '../'

export default {
  container: {
    ...styles.section,
    ...styles.center,
    justifyContent: 'flex-start',
    marginTop: 60
  },
  headerTitle: {
    fontWeight: '600'
  },
  google: {
    width: 120,
    height: 40
  },
  yahoo: {
    width: 120,
    height: 28
  },
  outlook: {
    width: 149,
    height: 31
  },
  icloud: {
    width: 147,
    height: 45
  },
  exchange: {
    width: 138,
    height: 30
  },
  service: {
    paddingTop: 60
  },
  section: {
    marginTop: 60
  },
  authServiceLink: {
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    width: 245,
    alignItems: 'center', 
  }
}