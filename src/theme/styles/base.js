const fontDefault = {
  fontFamily: "Lato",
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  color: "#9aa7af",
}

const center = {
  alignSelf: "stretch",
  alignItems: 'center', 
  justifyContent: 'center',
  flex: 1
}

// base styles
const styles = {
  center,
  fontDefault,
  splash: {
    ...center,
    backgroundColor: "#fcfcfc",
    flexGrow: 1
  },
  logo: {
    width: 76,
    height: 74,
    marginBottom: 20
  },
  logoText: {
    width: 256, 
    height: 74,
    marginBottom: 20
  },
  slogan: {
    ...fontDefault,
    textAlign: "center",
    color: "#3f8efc",
    fontSize: 20
  },
  welcome: {
    ...fontDefault,
    textAlign: "center",
    letterSpacing: 0.71,
    color: "#3f8efc"
  },
  section: {
    paddingBottom: 20,
  },
  row: {
    paddingTop: 10,
    paddingBottom: 10
  }
};

export default styles;
