import { StyleSheet } from "react-native";

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
const styles = StyleSheet.create({
  center,
  fontDefault,
  splash: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    ...center,
  },
  logo: {
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
    flex: 1,
    ...fontDefault, 
    padding: 10
  },
  row: {
    flex: 1,
    ...fontDefault,
    paddingTop: 10,
    paddingBottom: 10
  }
});

export default styles;