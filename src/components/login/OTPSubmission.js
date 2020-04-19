import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet, View} from 'react-native';
import {Item, Label, Input, Button, Text} from 'native-base';

export default class OTPSubmission extends React.Component {
  constructor() {
    super();
    this.state = {
      verificationCode: '',
    };
  }

  verifyOTP = () => {
    // Request for OTP verification
    const {confirmResult, userType} = this.props.navigation.state.params;
    if (userType === 'Consumer') {
      this.props.navigation.navigate('Consumer');
    } else {
      this.props.navigation.navigate('Seller');
    }
    return;
    if (this.state.verificationCode.length == 6) {
      confirmResult
        .confirm(this.state.verificationCode)
        .then(() => {
          if (userType === 'Consumer') {
            this.props.navigation.navigate('Consumer');
          } else {
            this.props.navigation.navigate('Seller');
          }
        })
        .catch((error) => {
          alert(error.message);
          console.log(error);
        });
    } else {
      alert('Please enter a 6 digit OTP code.');
    }
  };

  render() {
    let {navigation} = this.props;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
            <Item floatingLabel>
              <Label> Enter OTP </Label>
              <Input
                keyboardType="numeric"
                onChangeText={(text) => {
                  this.setState({verificationCode: text});
                }}
              />
            </Item>
            <View style={styles.actionItems}>
              <Button rounded onPress={this.verifyOTP}>
                <Text>GO</Text>
              </Button>
              <Button
                rounded
                warning
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text>Back</Text>
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    justifyContent: 'space-around',
    margin: 'auto',
  },
  actionItems: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
