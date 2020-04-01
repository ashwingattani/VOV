import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet, View} from 'react-native';
import {Item, Label, Input, Button, Text, Content} from 'native-base';

const UserTypes = {Consumer: 'consumer', Seller: 'seller'};

export default class Login extends React.Component {
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
          <View style={styles.content}>
            <Item floatingLabel>
              <Label> Mobile Number </Label>
              <Input keyboardType="numeric" />
            </Item>
            <Button
              rounded
              onPress={() => {
                this.props.navigation.navigate('OTP');
              }}>
              <Text>Login</Text>
            </Button>
            <Button rounded warning>
              <Text>Sign Up</Text>
            </Button>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    top: 10,
    justifyContent: 'center',
  },
});
