import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet, Platform} from 'react-native';
import {Item, Label, Input, Button, Text, View, Separator} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import {USER_TYPES} from '../../constants/Enums';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {addNewUser} from '../../actions/UserActions';
import {connect} from 'react-redux';

class SignUp extends React.Component {
  constructor() {
    super();
    this.username = '';
    this.mobileNumber = '';
    this.address = {};
    this.confirmResult = undefined;
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
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

  signupUser = () => {
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
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Item placeholderLabel>
            <Label> Name </Label>
            <Input
              autoCapitalize="words"
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
                  autoCapitalize="words"
                  onChangeText={(text) => {
                    this.address.houseNumber = text;
                  }}
                />
              </Item>
              <Item placeholderLabel>
                <Label> House Name </Label>
                <Input
                  autoCapitalize="words"
                  onChangeText={(text) => {
                    this.address.houseName = text;
                  }}
                />
              </Item>
              <Item placeholderLabel>
                <Label> Street </Label>
                <Input
                  multiline={true}
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
      </>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewUser: (user) => dispatch(addNewUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
