import React from "react";
import ReactDOM from "react-dom";
import "./web/index.css";
import { BrowserRouter, withRouter } from 'react-router-dom'
import registerServiceWorker from "./web/registerServiceWorker";

global.PLATFORM = 'web'

const App = require("./App").default;

// load expo 
// TODO: Expo web compatible

ReactDOM.render(<App loaded={true} Router={BrowserRouter} withRouter={withRouter} />, document.getElementById("root"));
registerServiceWorker();

const injectFonts = () => {
  const style = document.createElement("style");

  // fontAwesome
  const fontAwesomeFont = require("react-native-vector-icons/Fonts/FontAwesome.ttf");
  const fontAwesomeFontStyles = `@font-face {
src: url(${fontAwesomeFont});
font-family: 'FontAwesome';
}`;
  style.type = "text/css";
  if (style.styleSheet) {
    style.styleSheet.cssText = fontAwesomeFontStyles;
  } else {
    style.appendChild(document.createTextNode(fontAwesomeFontStyles));
  }

  // material-community
  const materialCommunityFont = require("react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf");
  const materialCommunityFontStyles = `@font-face {
src: url(${materialCommunityFont});
font-family: 'Material Design Icons';
}`;
  style.type = "text/css";
  if (style.styleSheet) {
    style.styleSheet.cssText = materialCommunityFontStyles;
  } else {
    style.appendChild(document.createTextNode(materialCommunityFontStyles));
  }

  // Material Icons
  const materialIconsFont = require("react-native-vector-icons/Fonts/MaterialIcons.ttf");
  const materialIconsFontStyles = `@font-face {
src: url(${materialIconsFont});
font-family: 'Material Icons';
}`;
  style.type = "text/css";
  if (style.styleSheet) {
    style.styleSheet.cssText = materialIconsFontStyles;
  } else {
    style.appendChild(document.createTextNode(materialIconsFontStyles));
  }

  // Octicons
  const octiconsFont = require("react-native-vector-icons/Fonts/Octicons.ttf");
  const octiconsFontStyles = `@font-face {
src: url(${octiconsFont});
font-family: 'Octions';
}`;
  style.type = "text/css";
  if (style.styleSheet) {
    style.styleSheet.cssText = octiconsFontStyles;
  } else {
    style.appendChild(document.createTextNode(octiconsFontStyles));
  }

  document.head.appendChild(style);

  // Lato Font
  const latoFont = require('./assets/fonts/Lato-Regular.ttf');
  const latoFontStyles = `@font-face {
  src: url(${latoFont});
  font-family: 'Lato';
  }`;
  style.type = "text/css";
  if (style.styleSheet) {
    style.styleSheet.cssText = latoFontStyles;
  } else {
    style.appendChild(document.createTextNode(latoFontStyles));
  }
  document.head.appendChild(style);

};

injectFonts();
