import React, { Component } from "react";
import { ScrollView, TouchableOpacity, StyleSheet, View, AsyncStorage, ToastAndroid, Platform } from "react-native";
import PinInput from 'react-native-pin-input';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'

import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Text,
  Card,
  CardItem,
  Icon,
  Fab,
  Separator,
  Button,
  Toast,
  Footer
} from "native-base";

const list = [
  {
    id: 1,
    accountName: "facebook",
    username: "kenshin1",
    password: "pauloo123",
    loginUrl: "https://goal.com",
    icon: "facebook"
  },
  {
    id: 2,
    accountName: "twitter",
    username: "kenshin2",
    password: "pauloo123",
    loginUrl: "https://goal.com",
    icon: "twitter"
  },
  {
    id: 3,
    accountName: "google",
    username: "kenshin3",
    password: "pauloo123",
    loginUrl: "https://goal.com",
    icon: "google"
  },
  {
    id: 4,
    accountName: "linkedin",
    username: "kenshin4",
    password: "pauloo123",
    loginUrl: "https://goal.com",
    icon: "linkedin"
  }
];

export default class Home extends Component {
  constructor(props) {
    super(props);
    // AsyncStorage.removeItem('accounts')
    this.state = {
      pin1: '',
      pin2: '',
      pinIsSet: false,
      disabled: true,
      showToast: false,
      accounts: []
    }
  }

  componentWillMount() {

    AsyncStorage.getItem('accounts', (err, res) => {
      if (!err) {
        if (res == null) {
          AsyncStorage.setItem('accounts', JSON.stringify([]), (err) => {
            if (!err) {
              this.setState({ accounts: [] })
              console.log('no err')
            } else {
              console.log(err)
            }
          })
        } else {
          this.setState({ accounts: JSON.parse(res) })
        }
      } else {
        console.log(err)
      }
    })

    AsyncStorage.getItem('pin').then(pin => {
      if (pin) {
        this.setState({ pinIsSet: true })
      }
    })
  }

  savePin() {
    if (this.state.pin1.length === 4) {
      this.setState({ disabled: false })
      if (this.state.pin1 === this.state.pin2) {
        AsyncStorage.setItem('pin', JSON.stringify(this.state.pin1));
        this.setState({ pinIsSet: true })
      } else {
        alert('PINs do not match \n please try again')
      }
    }
  }

  renderList() {
    return this.state.accounts.map(account => {
      return (
        <TouchableOpacity
          key={account.id}
          onPress={() =>
            this.props.navigation.navigate("ViewAccount", {
              account
            })}
        >
          <CardItem style={styles.listItem}>
            <Left>
              <Icon active name="lock" />
            </Left>
            <Body style={{ flex: 4 }}>
              <Text style={styles.nameText}>
                {account.accountName.toUpperCase()}
              </Text>
              <Text style={styles.subText}>{account.loginUrl}</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
          <Separator style={{ height: 1 }} />
        </TouchableOpacity>
      );
    });
  }
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        {this.state.pinIsSet ?
          <View style={styles.main}>
            <Content>
              {this.state.accounts.length > 0 ?
                <Card>{this.renderList()}</Card> :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>You don't have any accounts saved</Text>
                </View>
              }

            </Content>
            <Footer>
              <AdMobBanner
                adSize="banner"
                adUnitID="ca-app-pub-3856758681891175/3313776941"
                testDevices={['2dc7a4dd36fe3ca3']}
                onAdFailedToLoad={error => console.error(error)}
              />
            </Footer>
            <Fab
              style={{ backgroundColor: "#000000", bottom: 60 }}
              position="bottomRight"
              onPress={() => navigation.navigate("CreateAccount")}
            >
              <Icon name="add" color="#fff" />
            </Fab>
          </View>
          : <View style={styles.container}>
            <View>
              <Text style={{ textAlign: 'center' }}>Please set up your PIN</Text>
              <PinInput
                ref={"pin1"}
                autoFocus={true}
                pinItemStyle={{ width: 50, height: 50 }}
                pinItemProps={{ keyboardType: 'number-pad' }}
                onPinCompleted={(pin) => {
                  this.setState({ pin1: pin, disabled: false })
                }}
              />
              <Text style={{ textAlign: 'center' }}>Confirm your PIN</Text>
              <PinInput
                ref={"pin2"}
                pinLength={4}
                autoFocus={false}
                pinItemStyle={{ width: 50, height: 50 }}
                pinItemProps={{ keyboardType: 'number-pad' }}
                onPinCompleted={(pin) => {
                  this.setState({ pin2: pin })
                }}
              />
              <Button disabled={this.state.disabled} style={styles.btn} dark block onPress={() => this.savePin()}>
                <Text>Save PIN</Text>
              </Button>
            </View>
          </View>
        }
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  nameText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  subText: {
    color: "#999",
    fontStyle: "italic",
    fontSize: 14
  },
  listItem: {
    // borderColor: "#222",
    // borderBottomWidth: 2
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    flex: 1
  },
  btn: {
    marginTop: 20
  }
});
