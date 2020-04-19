import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet, View} from 'react-native';
import {Item, Label, Input, Button, Text} from 'native-base';
import {getUser} from '../../actions/UserActions';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';
import {UserTypes} from '../../constants/Enums';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      mobileNumber: '',
      confirmResult: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.user && prevProps.user !== this.props.user) {
      this.handleSendCode();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user && nextProps.user !== prevState.user) {
      return {
        user: nextProps.user,
      };
    }
    return null;
  }

  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test('+91' + this.props.user.mobileNumber);
  };

  handleSendCode = () => {
    // Request to send OTP
    if (this.validatePhoneNumber()) {
      firebase
        .auth()
        .signInWithPhoneNumber('+91' + this.props.user.mobileNumber)
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
    this.props.navigation.navigate('OTP', {
      user: this.props.user,
      isNewUser: false,
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
            <Button
              rounded
              onPress={() => this.props.getUser(this.state.mobileNumber)}>
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

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (mobileNumber) => dispatch(getUser(mobileNumber)),
  };
};

export default LoginModule = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
