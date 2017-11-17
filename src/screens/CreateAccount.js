import React, { Component } from "react";
import { View, Text } from "react-native";
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
      icon: "",
      loginUrl: ""
    };
  }

  handleSubmit(){
    console.log(this.state);
  }

  render() {
    const { accountName, username, password, loginUrl } = this.state;
    return (
      <Container>
        <Content>
          <Card>
            <Form style={{ backgroundColor: "#fff" }}>
              <Item floatingLabel>
                <Label>Account Name</Label>
                <Input
                  onChange={text => this.setState({ accountName : text })}
                  ref="accountName"
                  value={accountName}
                />
              </Item>
              <Text style={styles.meta}>e.g. Facebook</Text>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input
                  onChange={text => this.setState({ username: text })}
                  ref="username"
                  value={username}
                />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input
                  onChange={text => this.setState({ password: text })}
                  ref="password"
                  value={password}
                />
              </Item>
              <Item floatingLabel last>
                <Label>Login Link</Label>
                <Input
                  onChange={text => this.setState({ loginUrl: text })}
                  ref="loginUrl"
                  value={loginUrl}
                />
              </Item>
              <Text style={styles.meta}>e.g. http://...</Text>
              <Button full primary onPress={this.handleSubmit.bind(this)}>
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
    marginVertical: 10
  },
  meta: {
    marginLeft: 15,
    fontStyle: "italic"
  }
};

export default CreateAccount;
