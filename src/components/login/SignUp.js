import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {Item, Label, Input, Button} from 'native-base';

const UserTypes = {Consumer: 'consumer', Seller: 'seller'};

export default class SignUp extends React.Component {
  constructor() {
    this.state = {
      userType: UserTypes.Consumer,
    };
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Item floatingLabel>
            <Label> Mobile Number </Label>
            <Input />
          </Item>
          <Button rounded click={console.log('ashwin')}>
            <Text>Login</Text>
          </Button>
          <Button rounded warning>
            <Text>Sign Up</Text>
          </Button>
        </SafeAreaView>
      </>
    );
  }
}
