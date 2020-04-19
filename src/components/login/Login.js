import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet, View} from 'react-native';
import {Item, Label, Input, Button, Text} from 'native-base';
import {saveUser} from '../../actions/UserActions';
import {connect} from 'react-redux';
const UserTypes = {Consumer: 'Consumer', Seller: 'Seller'};
import firebase from 'react-native-firebase';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      mobileNumber: '',
      confirmResult: null,
      verificationCode: '',
      userId: '',
    };
  }

  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test('+91' + this.state.mobileNumber);
  };

  handleSendCode = () => {
    // Request to send OTP
    if (this.validatePhoneNumber()) {
      firebase
        .auth()
        .signInWithPhoneNumber('+91' + this.state.mobileNumber)
        .then((confirmResult) => {
          this.setState({confirmResult}, () => {
            this.handleLoginPress();
          });
        })
        .catch((error) => {
          alert(error.message);

          console.log(error);
        });
    } else {
      alert('Invalid Phone Number');
    }
  };

  handleLoginPress = () => {
    let user = {
      name: 'Test Login',
      mobileNumber: this.state.mobileNumber,
      address: 'some address',
      pincode: '098765',
      type:
        this.state.mobileNumber == '8408909335'
          ? UserTypes.Consumer
          : UserTypes.Seller,
    };
    this.props.saveUser(user);
    this.props.navigation.navigate('OTP', {
      userType: user.type,
      confirmResult: this.state.confirmResult,
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
                onChangeText={(text) => {
                  this.setState({mobileNumber: text});
                }}
              />
            </Item>
            <Button rounded onPress={this.handleSendCode}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    saveUser: (user) => dispatch(saveUser(user)),
  };
};

export default LoginModule = connect(null, mapDispatchToProps)(Login);
