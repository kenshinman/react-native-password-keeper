import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { NavigationActions } from 'react-navigation'
import {
  Fab,
  Container,
  Content,
  Icon,
  Card,
  CardItem,
  Form,
  Item,
  Input,
  Label,
  Body,
  Button
} from "native-base";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountName: "",
      username: "",
      password: "",
      icon: null,
      loginUrl: "http://",
      allAccounts: null
    };
  }

  componentWillMount() {
    //AsyncStorage.removeItem('accounts')
    AsyncStorage.getItem('accounts', (err, res) => {
      if (!err) {
        this.setState({ allAccounts: JSON.parse(res) })
      }
    })
  }

  handleSubmit() {
    const { accountName, username, password, loginUrl } = this.state;
    let newAccount = {
      id: Date.now(),
      accountName,
      username,
      password,
      loginUrl,
      icon: null,
    }

    this.setState({ 
      allAccounts: [...this.state.allAccounts, newAccount] 
    }, 
    function () {
      AsyncStorage.setItem('accounts', JSON.stringify(this.state.allAccounts))
      // this.props.navigation.navigate('Home')
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home'})
        ]
      })
      this.props.navigation.dispatch(resetAction)
    })

  }

  render() {
    const { accountName, username, password, loginUrl } = this.state;
    console.log(this.state.allAccounts)
    return (
      <Container>
        <Content>
          <Card>
            <Form style={{ backgroundColor: "#fff" }}>
              <Item floatingLabel>
                <Label>Account Name</Label>
                <Input
                  onChangeText={text => this.setState({ accountName: text })}
                  ref="accountName"
                  value={this.state.accountName}
                  autoFocus={true}
                />
              </Item>
              <Text style={styles.meta}>e.g. Facebook</Text>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input
                  onChangeText={text => this.setState({ username: text })}
                  ref="username"
                  value={username}
                  autoCapitalize='none'
                />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input
                  onChangeText={text => this.setState({ password: text })}
                  ref="password"
                  value={password}
                  autoCapitalize='none'
                />
              </Item>
              <Item floatingLabel last>
                <Label>Login Link</Label>
                <Input
                  onChangeText={text => this.setState({ loginUrl: text })}
                  ref="loginUrl"
                  value={loginUrl}
                />
              </Item>
              <Text style={styles.meta}>e.g. http://...</Text>
              <Button style={styles.btn} full dark onPress={this.handleSubmit.bind(this)}>
                <Text style={styles.btnText}>Create Account</Text>
              </Button>
            </Form>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = {
  btnText: {
    color: "#fff"
  },
  btn: {
    marginTop: 20
  },
  meta: {
    marginLeft: 15,
    fontStyle: "italic"
  }
};

export default CreateAccount;
