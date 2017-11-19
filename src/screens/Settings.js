import React, { Component } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  AsyncStorage
} from 'react-native';
import { Button } from 'native-base';
import { NavigationActions } from 'react-navigation'
import Toast, { DURATION } from 'react-native-easy-toast'

export default class Settings extends Component {
  state = {
    disabled: true,
    oldPass: '',
    newPass1: '',
    newPass2: ''
  }
  changePin() {
    //alert('hey')
    if (this.state.oldPass == this.state.savedPin) {

      if (this.state.newPass1 === this.state.newPass2) {
        AsyncStorage.setItem('pin', JSON.stringify(this.state.newPass1))
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' })
          ]
        })
        this.props.navigation.dispatch(resetAction)
          
      } else {
        this.refs.toast.show('Your PINs do not match');
      }
    } else {
      console.log(this.state)
      this.refs.toast.show('Your old pin is incorrect');
      return false;
    }

  }
  enableBtn() {
    if (this.state.newPass1.length == 4 && this.state.newPass2.length == 4 && this.state.oldPass.length == 4) {
      this.setState({ disabled: false })
    } else {
      this.setState({ disabled: true })
    }
  }
  componentWillMount() {
    AsyncStorage.getItem('pin').then((json) => this.setState({ savedPin: JSON.parse(json) }))
  }
  render() {
    // console.log(this.state)
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Enter Old PIN</Text>
        <View style={styles.pinWrap}>
          <TextInput
            ref="one"
            style={styles.pin}
            placeholder='* * * *'
            secureTextEntry={true}
            maxLength={4}
            autoFocus={true}
            keyboardType='numeric'
            value={this.state.oldPass}
            onChangeText={(text) => {
              this.setState({ oldPass: text }, function () {
                this.enableBtn()
              });
            }}
          />
        </View>
        <Text style={styles.instructions}>Enter New PIN</Text>
        <View style={styles.pinWrap}>
          <TextInput
            ref="newPass1"
            style={styles.pin}
            placeholder='* * * *'
            secureTextEntry={true}
            maxLength={4}
            keyboardType='numeric'
            value={this.state.newPass1}
            onChangeText={(text) => {
              this.setState({ newPass1: text }, function () {
                this.enableBtn()
              });
            }}
          />
        </View>
        <Text style={styles.instructions}>Confirm New PIN</Text>
        <View style={styles.pinWrap}>
          <TextInput
            ref="newPass2"
            style={styles.pin}
            placeholder='* * * *'
            secureTextEntry={true}
            maxLength={4}
            keyboardType='numeric'
            value={this.state.newPass2}
            onChangeText={(text) => {
              this.setState({ newPass2: text }, function () {
                this.enableBtn()
              });

            }}
          />

        </View>
        <Button disabled={this.state.disabled} style={styles.btn} dark onPress={() => this.changePin()}>
          <Text style={styles.btnText}>Change PIN</Text>
        </Button>
        <Toast ref="toast" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  instructions: {},
  pin: {
    height: 40,
    width: 180,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    margin: 5,
    textAlign: 'center'
  },
  pinWrap: {
    flexDirection: 'row',
    marginBottom: 20
  },
  btnText: {
    color: '#fff',
    textAlign: 'center'
  },
  btn: {
    alignSelf: 'center',
    width: 200,
    justifyContent: 'center'
  }
})