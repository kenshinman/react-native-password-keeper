import React, { Component } from "react";
import RootNavigator from "./src/config/routes";

console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return <RootNavigator />;
  }
}
