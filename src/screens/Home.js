import React, { Component } from "react";
import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
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
  Separator
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
  handleFabPress() {
    alert("Hola");
  }

  renderList() {
    return list.map(account => {
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
              <Icon active name={`logo-${account.icon}`} />
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
          <Separator style={{height: 1}}/>
        </TouchableOpacity>
      );
    });
  }
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Content>
          <Card>{this.renderList()}</Card>
        </Content>
        <Fab
          style={{ backgroundColor: "#2ecc71" }}
          position="bottomRight"
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  nameText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  subText: {
    color: "#999",
    fontStyle: "italic",
    fontSize: 14
  },
  listItem: {
    borderColor: "#222",
    borderBottomWidth: 2
  }
});
