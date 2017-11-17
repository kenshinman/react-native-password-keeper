import React, { Component } from "react";
import { View, Text } from "react-native";
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
    authenticated: false
  };
  componentDidMount() {
    const { account } = this.props.navigation.state.params;
    const { accountName, username, password, loginUrl, id, icon } = account;
    this.setState({
      accountName, username, password, loginUrl, id, icon
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
                <Input defaultValue={accountName} autoFocus />
              </Item>
              <Item fixedLabel>
                <Label>Username</Label>
                <Input defaultValue={username} />
              </Item>
              <Item fixedLabel>
                <Label>Login Url</Label>
                <Input defaultValue={loginUrl} />
              </Item>
              <Item fixedLabel last>
                <Label>Password</Label>
                <Input defaultValue={password} />
              </Item>
              <Button block success>
                <Icon name="checkmark" />
                <Text style={{color: '#fff'}}>Save</Text>
              </Button>
            </Form>
          </Card>
        </Content>
      </Container>
    );
  }
}
