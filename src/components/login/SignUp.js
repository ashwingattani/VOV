import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {Item, Label, Input, Button, Text} from 'native-base';

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.username = '';
    this.mobileNumber = '';
  }

  render() {
    let {navigation} = this.props;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Item floatingLabel>
            <Label> Name </Label>
            <Input
              autoCapitalize="words"
              onChangeText={text => {
                this.username.concat(text);
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label> Mobile Number </Label>
            <Input
              keyboardType="numeric"
              onChangeText={text => {
                this.mobileNumber.concat(text);
              }}
            />
          </Item>
          <Button
            rounded
            onPress={() => {
              navigation.navigate('OTP', {
                userType: navigation.state.params.userType,
              });
            }}>
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
