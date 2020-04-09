import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet, View} from 'react-native';
import {Item, Label, Input, Button, Text} from 'native-base';
import {saveUser} from '../../actions/UserActions';
import {connect} from 'react-redux';
const UserTypes = {Consumer: 'Consumer', Seller: 'Seller'};

class Login extends React.Component {
  constructor() {
    super();
    this.mobileNumber = '';
  }

  handleLoginPress = () => {
    let user = {
      name: 'Test Login',
      mobileNumber: this.mobileNumber,
      address: 'some address',
      pincode: '098765',
      type:
        this.mobileNumber == '1234567890'
          ? UserTypes.Consumer
          : UserTypes.Seller,
    };
    this.props.saveUser(user);
    this.props.navigation.navigate('OTP', {
      userType: user.type,
    });
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.content}>
            <Item floatingLabel>
              <Label> Mobile Number </Label>
              <Input
                keyboardType="numeric"
                onChangeText={text => {
                  this.mobileNumber = text;
                }}
              />
            </Item>
            <Button rounded onPress={this.handleLoginPress}>
              <Text>Login</Text>
            </Button>
            <Button
              rounded
              warning
              onPress={() => {
                this.props.navigation.navigate('Signup', {
                  userType: UserTypes.Consumer,
                });
              }}>
              <Text>Sign Up as Customer</Text>
            </Button>
            <Button
              rounded
              warning
              onPress={() => {
                this.props.navigation.navigate('Signup', {
                  userType: UserTypes.Seller,
                });
              }}>
              <Text>Sign Up as Seller</Text>
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

const mapDispatchToProps = dispatch => {
  return {
    saveUser: user => dispatch(saveUser(user)),
  };
};

export default LoginModule = connect(null, mapDispatchToProps)(Login);
