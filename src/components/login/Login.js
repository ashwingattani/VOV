import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Keyboard,
} from 'react-native';
import {Item, Label, Input, Button, Text, Toast, Root} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import {getUser, saveUser} from '../../actions/UserActions';
import {connect} from 'react-redux';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {USER_TYPES} from '../../constants/Enums';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      mobileNumber: '',
      confirmResult: null,
    };
    this.preLoggedUser = undefined;
    this.authSubscriber = undefined;
  }

  componentDidMount() {
    this.authSubscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user && !this.preLoggedUser) {
        this.preLoggedUser = user;
        this.props.getUser(user._user.phoneNumber.replace('+91', ''));
      }
    });
  }

  componentWillUnmount() {
    if (this.authSubscriber) {
      this.authSubscriber();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user && prevProps.user !== this.props.user) {
      if (this.preLoggedUser) {
        this.preLoggedUser = undefined;
        this.props.saveUser(this.props.user);
        if (this.props.user.type === USER_TYPES.Consumer) {
          this.props.navigation.navigate('Consumer');
        } else {
          this.props.navigation.navigate('Seller');
        }
      } else {
        this.handleSendCode();
      }
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

  handleLogin = () => {
    Keyboard.dismiss();
    if (this.validatePhoneNumber()) {
      this.props.getUser(this.state.mobileNumber);
    } else {
      Toast.show({
        text: 'Invalid Phone Number',
        position: 'bottom',
        type: 'warning',
        duration: 5000,
      });
    }
  };

  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test('+91' + this.state.mobileNumber);
  };

  handleSendCode = () => {
    // Request to send OTP
    firebase
      .auth()
      .signInWithPhoneNumber('+91' + this.props.user.mobileNumber)
      .then((confirmResult) => {
        this.setState({confirmResult}, () => {
          this.submitOTP();
        });
      })
      .catch((error) => {
        alert(error.message);

        console.log(error);
      });
  };

  submitOTP = () => {
    this.props.navigation.navigate('OTP', {
      user: this.props.user,
      isNewUser: false,
      confirmResult: this.state.confirmResult,
    });
  };

  render() {
    return (
      <Root>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.content}>
            <Item floatingLabel>
              <Label> Mobile Number </Label>
              <Input
                maxLength={10}
                value={this.state.mobileNumber}
                keyboardType="numeric"
                onChangeText={(text) => {
                  this.setState({mobileNumber: text});
                }}
              />
            </Item>
            <View style={styles.login}>
              <Button rounded onPress={() => this.handleLogin()}>
                <Text>Login</Text>
              </Button>
            </View>
            <View style={styles.signup}>
              <Button
                rounded
                warning
                onPress={() => {
                  this.props.navigation.navigate('Signup', {
                    userType: USER_TYPES.Seller,
                  });
                }}>
                <Text>Sign Up as Seller</Text>
              </Button>
              <Button
                rounded
                warning
                onPress={() => {
                  this.props.navigation.navigate('Signup', {
                    userType: USER_TYPES.Consumer,
                  });
                }}>
                <Text>Sign Up as Customer</Text>
              </Button>
            </View>
          </View>
          <Spinner
            visible={this.props.isLoading}
            textContent={'Loading...'}
            textStyle={{color: '#fff'}}
          />
        </SafeAreaView>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    top: 10,
    justifyContent: 'center',
  },
  login: {
    top: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  signup: {
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    isLoading: state.user.isLoading,
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (mobileNumber) => dispatch(getUser(mobileNumber)),
    saveUser: (user) => dispatch(saveUser(user)),
  };
};

export default LoginModule = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
