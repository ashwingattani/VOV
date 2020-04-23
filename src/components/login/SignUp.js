import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import {Item, Label, Input, Button, Text, View, Separator} from 'native-base';
import {USER_TYPES} from '../../constants/Enums';
import firebase from 'react-native-firebase';

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.username = '';
    this.mobileNumber = '';
    this.address = {};
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
        this.props.navigation.navigate('OTP', {
          user,
          isNewUser: true,
          confirmResult: confirmResult,
        });
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
