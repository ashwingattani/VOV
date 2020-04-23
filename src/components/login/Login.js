import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet, View} from 'react-native';
import {
  Item,
  Label,
  Input,
  Button,
  Text,
  Toast,
  Root,
  Spinner,
} from 'native-base';
import {getUser} from '../../actions/UserActions';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';
import {USER_TYPES} from '../../constants/Enums';

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
    return regexp.test('+91' + this.state.mobileNumber);
  };

  handleSendCode = () => {
    // Request to send OTP
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
      <Root>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          {this.props.isLoading ? (
            <Spinner color="green" />
          ) : (
            <View style={styles.content}>
              <Item floatingLabel>
                <Label> Mobile Number </Label>
                <Input
                  value={this.state.mobileNumber}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    this.setState({mobileNumber: text});
                  }}
                />
              </Item>
              <View style={styles.login}>
                <Button
                  rounded
                  onPress={() => {
                    if (this.validatePhoneNumber()) {
                      this.props.getUser(this.state.mobileNumber);
                    } else {
                      Toast.show({
                        text: 'Invalid Phone Number',
                        position: 'bottom',
                        type: 'warning',
                        duration: 1000,
                      });
                    }
                  }}>
                  <Text>Login</Text>
                </Button>
              </View>
              <View style={styles.signup}>
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
              </View>
            </View>
          )}
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
});

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    isLoading: state.user.isLoading,
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
