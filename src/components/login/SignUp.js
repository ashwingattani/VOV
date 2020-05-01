import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Platform,
  Keyboard,
} from 'react-native';
import {
  Item,
  Label,
  Input,
  Button,
  Text,
  View,
  Separator,
  Toast,
  Root,
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import {USER_TYPES, REGEX} from '../../constants/Enums';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {addNewUser, getUser} from '../../actions/UserActions';
import {connect} from 'react-redux';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
    };

    this.username = '';
    this.mobileNumber = '';
    this.address = {};
    this.confirmResult = undefined;
    this.authSubscriber = undefined;
  }

  componentDidMount() {
    this.authSubscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (Platform.OS == 'android') {
          let user = {
            name: this.username,
            mobileNumber: this.mobileNumber,
            address: this.address,
            type: this.props.navigation.state.params.userType,
          };
          this.props.addNewUser(user);
          if (
            this.props.navigation.state.params.userType === USER_TYPES.Consumer
          ) {
            this.props.navigation.navigate('Consumer');
          } else {
            this.props.navigation.navigate('Seller');
          }
        }
      } else if (this.confirmResult) {
        this.props.navigation.navigate('OTP', {
          user,
          isNewUser: true,
          confirmResult: this.confirmResult,
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.authSubscriber) {
      this.authSubscriber();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user && nextProps.user !== prevState.user) {
      return {user: nextProps.user};
    }
    return null;
  }

  componentDidUpdate() {
    if (this.state.user) {
      Toast.show({
        text:
          'User with this mobile number exists, please login or signup with another mobile number',
        position: 'bottom',
        type: 'warning',
        duration: 1000,
        onClose: () => {
          this.setState({user: undefined});
        },
      });
    } else {
      if (!this.confirmResult) {
        this.authenticateUserForSignup();
      }
    }
  }

  validateFields = () => {
    let isNameValid = REGEX.name.test(this.username);
    let isMobileNumberValid = REGEX.phone.test('+91' + this.mobileNumber);
    let isHouseNumberValid = REGEX.houseNumber.test(this.address.houseNumber);
    let isHouseNameValid = REGEX.address.test(this.address.houseName);
    let isStreetValid = REGEX.address.test(this.address.street);
    let isPinCodeValid = REGEX.pincode.test(this.address.pincode);

    if (!isNameValid) {
      Toast.show({
        text: 'Please enter valid name',
        position: 'bottom',
        type: 'warning',
        duration: 1000,
      });
      return false;
    }

    if (!isMobileNumberValid) {
      Toast.show({
        text: 'Please enter valid mobile number',
        position: 'bottom',
        type: 'warning',
        duration: 1000,
      });
      return false;
    }

    if (
      !isHouseNumberValid ||
      !isHouseNameValid ||
      !isStreetValid ||
      !isPinCodeValid
    ) {
      Toast.show({
        text: 'Please enter valid address details',
        position: 'bottom',
        type: 'warning',
        duration: 5000,
      });
      return false;
    }

    return true;
  };

  signupUser = () => {
    Keyboard.dismiss();
    if (this.validateFields()) {
      this.props.getUser(this.mobileNumber);
    }
  };

  authenticateUserForSignup = () => {
    let user = {
      name: this.username,
      mobileNumber: this.mobileNumber,
      address: this.address,
      type: this.props.navigation.state.params.userType,
    };

    firebase
      .auth()
      .signInWithPhoneNumber('+91' + this.mobileNumber)
      .then((confirmResult) => {
        this.confirmResult = confirmResult;

        if (Platform.OS == 'ios') {
          this.props.navigation.navigate('OTP', {
            user,
            isNewUser: true,
            confirmResult: confirmResult,
          });
        }
      })
      .catch((error) => {
        alert(error.message);

        console.log(error);
      });
  };

  render() {
    let {userType} = this.props.navigation.state.params;
    return (
      <Root>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Item placeholderLabel>
            <Label> Name </Label>
            <Input
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(text) => {
                this.username = text;
              }}
            />
          </Item>
          <Item placeholderLabel>
            <Label> Mobile Number </Label>
            <Input
              maxLength={10}
              keyboardType="numeric"
              onChangeText={(text) => {
                this.mobileNumber = text;
              }}
            />
          </Item>
          <Separator bordered>
            <Text>Address</Text>
          </Separator>
          {userType == USER_TYPES.Consumer ? (
            <View>
              <Item placeholderLabel>
                <Label> House Number </Label>
                <Input
                  placeholder="Eg. A-210 or AB-210"
                  autoCorrect={false}
                  onChangeText={(text) => {
                    this.address.houseNumber = text;
                  }}
                />
              </Item>
              <Item placeholderLabel>
                <Label> House Name </Label>
                <Input
                  autoCapitalize="words"
                  autoCorrect={false}
                  onChangeText={(text) => {
                    this.address.houseName = text;
                  }}
                />
              </Item>
              <Item placeholderLabel>
                <Label> Street </Label>
                <Input
                  multiline={true}
                  autoCorrect={false}
                  style={{
                    height: 50,
                  }}
                  onChangeText={(text) => {
                    this.address.street = text;
                  }}
                />
              </Item>
              <Item placeholderLabel>
                <Label> Pincode </Label>
                <Input
                  keyboardType="numeric"
                  maxLength={6}
                  onChangeText={(text) => {
                    this.address.pincode = text;
                  }}
                />
              </Item>
            </View>
          ) : (
            <View>
              <Item placeholderLabel>
                <Label> Shop Name </Label>
                <Input
                  autoCapitalize="words"
                  autoCorrect={false}
                  onChangeText={(text) => {
                    this.address.houseName = text;
                  }}
                />
              </Item>
              <Item placeholderLabel>
                <Label> PinCode </Label>
                <Input
                  keyboardType="numeric"
                  maxLength={6}
                  onChangeText={(text) => {
                    this.address.pincode = text;
                  }}
                />
              </Item>
            </View>
          )}
          <Button rounded style={styles.actions} onPress={this.signupUser}>
            <Text>SignUp</Text>
          </Button>
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
  actions: {
    top: 20,
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    isLoading: state.user.isLoading,
    error: state.user.error,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewUser: (user) => dispatch(addNewUser(user)),
    getUser: (mobileNumber) => dispatch(getUser(mobileNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
