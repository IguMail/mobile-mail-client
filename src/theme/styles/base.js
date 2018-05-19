const fontDefault = {
  fontFamily: "Lato",
  fontSize: 20,
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
    backgroundColor: "#fcfcfc"
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
    color: "#9aa7af"
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