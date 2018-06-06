const path = require("path");
const fs = require("fs");
const { getLoader, loaderNameMatches } = require("react-app-rewired");
const rewireMobX = require('react-app-rewire-mobx');

const rewireBabelLoader = require("react-app-rewire-babel-loader");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = function override(config, env) {
  // console.log(JSON.stringify(config, null, 2));

  const vectorIcons = resolveApp("node_modules/react-native-vector-icons");
  const elements = resolveApp("node_modules/react-native-elements");
  const router = resolveApp("node_modules/react-router-native");
  const expo = resolveApp("node_modules/expo");
  const storage = resolveApp("node_modules/react-native-storage");

  // transpile libraries
  config = rewireBabelLoader.include(config, elements, vectorIcons, router, expo, storage);

  // mobx decorators
  config = rewireMobX(config, env)

  return config;
};
