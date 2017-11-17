import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import FingerprintScanner from 'react-native-fingerprint-scanner';
import FingerprintPopup from '../components/FingerPrintPopup'
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
      authenticated: false,
      scanner: true
    };
  }
  componentWillMount() {
    FingerprintScanner
      .isSensorAvailable()
      .catch(error => this.setState({ scanner: false }));
  }

  handlePopupDismissed() {
    alert('done')
  }
  render() {
    const { account } = this.props.navigation.state.params;
    const { accountName, username, password, loginUrl, id, icon } = account;
    return (
      <Container>
        {this.state.authenticated ?
          <Card>
            <Content>
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
          </Card>

          :
          <View style={styles.auth}>
            <Text>Not Authenticated</Text>
            <Text>{this.state.errorMessage}</Text>
            {this.state.scanner ? <FingerprintPopup handlePopupDismissed={this.handlePopupDismissed()} /> : null}
          </View>
        }

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  auth: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34dede'
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
})

export default ViewAccount;
