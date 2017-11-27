import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { NavigationActions } from 'react-navigation'
import {
  Container,
  Content,
  Card,
  CardItem,
  Icon,
  Fab,
  Form,
  Item,
  Input,
  Label,
  Button
} from "native-base";

export default class EditAccount extends Component {
  state = {
    authenticated: false,
    allAccounts: []
  };
  componentDidMount() {
    const { account } = this.props.navigation.state.params;
    const { accountName, username, password, loginUrl, id, icon } = account;
    this.setState({
      accountName, username, password, loginUrl, id, icon
    }, () => {
      console.log(this.state)
    })
  }

  componentWillMount() {
    AsyncStorage.getItem('accounts').then(accounts => {
      this.setState({ allAccounts: JSON.parse(accounts) })
    })
  }

  doUpdate(id) {
    let { accountName, username, password, loginUrl } = this.state;
    let updatedAccount = { accountName, username, password, loginUrl }
    let newAccounts = [];
    let accounts = this.state.allAccounts;
    accounts.forEach(account => {
      if (account.id == id) {
        account = updatedAccount;
      }
      newAccounts.push(account)
    })
    AsyncStorage.setItem('accounts', JSON.stringify(newAccounts), () => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' })
        ]
      })
      this.props.navigation.dispatch(resetAction)
    })
  }

  render() {

    const { accountName, username, password, loginUrl, id, icon } = this.state;
    return (
      <Container>
        <Content>
          <Card>
            <Form>
              <Item fixedLabel>
                <Label>Account Name</Label>
                <Input
                  value={this.state.accountName}
                  onChangeText={(text) => this.setState({ accountName: text })}
                  autoFocus />
              </Item>
              <Item fixedLabel>
                <Label>Username</Label>
                <Input
                  value={this.state.username}
                  onChangeText={(text) => this.setState({ username: text })}
                />
              </Item>
              <Item fixedLabel>
                <Label>Login Url</Label>
                <Input
                  value={this.state.loginUrl}
                  onChangeText={(text) => this.setState({ loginUrl: text })}
                />
              </Item>
              <Item fixedLabel last>
                <Label>Password</Label>
                <Input
                  value={this.state.password}
                  onChangeText={(text) => this.setState({ password: text })}
                />
              </Item>
              <Button block success onPress={() => this.doUpdate(id)}>
                <Icon name="checkmark" />
                <Text style={{ color: '#fff' }}>Save</Text>
              </Button>
            </Form>
          </Card>
        </Content>
      </Container>
    );
  }
}
