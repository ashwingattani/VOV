import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {Item, Label, Input, Button, Text} from 'native-base';

const UserTypes = {Consumer: 'consumer', Seller: 'seller'};

export default class OTPSubmission extends React.Component {
  constructor() {
    super();
    state = {
      userType: UserTypes.Consumer,
    };
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Item floatingLabel>
            <Label> Enter OTP </Label>
            <Input />
          </Item>
          <Button
            rounded
            onPress={() => {
              this.props.navigation.navigate('Consumer');
            }}>
            <Text>GO</Text>
          </Button>
          <Button rounded warning>
            <Text>Back</Text>
          </Button>
        </SafeAreaView>
      </>
    );
  }
}
