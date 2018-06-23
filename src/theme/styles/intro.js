import styles from './'
export default {
  wrapper: {
    backgroundColor: '#e1f6ff',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e91e63',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#673ab7',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3f51b5',
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#95d7a2',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  dot: {
    height: 10,
    width: 10
  },
  activeDot: {
    width: 26
  },
  btnStyle: {
    ...styles.btnPrimary,
    width: 250,
    height: 50,
    marginTop: 20
  },
}