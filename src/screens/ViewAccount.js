import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import PinInput from 'react-native-pin-input'
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
      scanner: false,
      savedPin: ''
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('pin').then((pin) => {
      if (pin) {
        this.setState({savedPin: JSON.parse(pin)})
      } else {
        alert('no pin')
      }
    })
  }
  componentDillMount() {
    FingerprintScanner
      .isSensorAvailable()
      .then(() => this.setState({ scanner: true }))
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
            <Text>Please Enter your pin to view or edit this account</Text>
            <PinInput
              ref={"pin"}
              pinLength={4}
              autoFocus={true}
              pinItemStyle={{ width: 50, height: 50 }}
              pinItemProps={{ keyboardType: 'number-pad' }}
              onPinCompleted={(pin) => {
                if(pin == this.state.savedPin){
                  this.setState({ authenticated: true })
                }else{
                  alert('PIN is incorrect. \n Please check and try again')
                }
              }}
            />
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
