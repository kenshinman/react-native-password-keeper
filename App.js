import React, { Component } from "react";
import RootNavigator from "./src/config/routes";
import SplashScreen from 'react-native-smart-splash-screen'

console.disableYellowBox = true;

export default class App extends Component {
  componentDidMount() {
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 1200,
      delay: 500,
    })
  }
  render() {
    return <RootNavigator />;
  }
}
