import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import {
  DrawerNavigator,
  StackNavigator,
  TabNavigator
} from "react-navigation";
import { Icon } from "native-base";
import Home from "../screens/Home";
import ViewAccount from "../screens/ViewAccount";
import CreateAccount from "../screens/CreateAccount";
import EditAccount from "../screens/EditAccount";

const os = Platform.OS === "ios" ? "ios" : "md";

const RootNavigator = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Password Keeper",
        headerRight: (
          <View style={styles.rightIcon}>
            <TouchableOpacity>
              <Icon name="options" />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: (
          <View style={styles.leftIcon}>
            <TouchableOpacity>
              <Icon name="lock" />
            </TouchableOpacity>
          </View>
        )
      })
    },
    ViewAccount: {
      screen: ViewAccount,
      navigationOptions: ({ navigation }) => ({
        headerTitle: `View ${navigation.state.params.account
          .accountName}`.toUpperCase()
      })
    },
    CreateAccount: {
      screen: CreateAccount,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Create Account"
      })
    },
    EditAccount: {
      screen: EditAccount,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Edit Account"
      })
    }
    // About: {
    //   screen: About,
    //   title: "About LIWC",
    //   navigationOptions: ({ navigation }) => ({
    //     headerTitle: "ABOUT LIWC 2017"
    //   })
    // },
    //  Minister: {
    //   screen: Minister,
    //   navigationOptions: ({ navigation }) => ({
    //     headerTitle: `${navigation.state.params.minister.name}`
    //   })
    // },
  },
  {
    headerMode: "screen"
  }
);

const styles = {
  rightIcon: {
    marginRight: 15
  },
  leftIcon: {
    marginLeft: 15
  }
};
export default RootNavigator;
