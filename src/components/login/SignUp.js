import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {Item, Label, Input, Button, Text, Header} from 'native-base';

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.username = '';
    this.mobileNumber = '';
  }

  signupUser = () => {
    let user = {
      name: this.username,
      mobileNumber: this.mobileNumber,
      houseNumber: '',
      houseName: '',
      street: '',
      pincode: '',
      type: navigation.state.params.userType,
    };
    navigation.navigate('OTP', {
      user,
      isNewUser: true,
    });
  };

  render() {
    let {navigation} = this.props;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Header>
            <Text>SIGN UP</Text>
          </Header>
          <Item floatingLabel>
            <Label> Name </Label>
            <Input
              autoCapitalize="words"
              onChangeText={(text) => {
                this.username = text;
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label> Mobile Number </Label>
            <Input
              keyboardType="numeric"
              onChangeText={(text) => {
                this.mobileNumber = text;
              }}
            />
          </Item>
          <Button rounded onPress={this.signupUser}>
            <Text>Login</Text>
          </Button>
          <Button
            rounded
            warning
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Text>Back</Text>
          </Button>
        </SafeAreaView>
      </>
    );
  }
}
