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
  Label
} from "native-base";

class ViewAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }
  render() {
    const { account } = this.props.navigation.state.params;
    const { accountName, username, password, loginUrl, id, icon } = account;
    return (
      <Container>
        <Content>
          <Card>
            <Form>
              <Item fixedLabel>
                <Label>Account Name</Label>
                <Input disabled defaultValue={accountName} />
              </Item>
              <Item fixedLabel>
                <Label>Username</Label>
                <Input disabled defaultValue={username} />
              </Item>
              <Item fixedLabel>
                <Label>Login Url</Label>
                <Input disabled defaultValue={loginUrl} />
              </Item>
              <Item fixedLabel last>
                <Label>Password</Label>
                <Input disabled defaultValue={password} />
              </Item>
            </Form>
          </Card>
        </Content>
        <Fab
          style={{ backgroundColor: "orange" }}
          position="bottomRight"
          onPress={() =>
            this.props.navigation.navigate("EditAccount", { account })}
        >
          <Icon name="create" />
        </Fab>
        <Fab
          style={{ backgroundColor: "red" }}
          position="bottomLeft"
          onPress={() => alert("CreateAccount")}
        >
          <Icon name="trash" />
        </Fab>
      </Container>
    );
  }
}

export default ViewAccount;
