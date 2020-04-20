import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet, View} from 'react-native';
import {Item, Label, Input, Button, Text} from 'native-base';
import {saveUser, addNewUser} from '../../actions/UserActions';
import {connect} from 'react-redux';
import {UserTypes} from '../../constants/Enums';

class OTPSubmission extends React.Component {
  constructor() {
    super();
    this.state = {
      verificationCode: '',
    };
  }

  verifyOTP = () => {
    this.props.navigation.navigate('Seller');
    return;
    // Request for OTP verification
    const {confirmResult, user, isNewUser} = this.props.navigation.state.params;
    if (this.state.verificationCode.length == 6) {
      confirmResult
        .confirm(this.state.verificationCode)
        .then(() => {
          if (isNewUser) {
            this.props.addNewUser(user);
          } else {
            this.props.saveUser(user);
          }

          if (user.type === UserTypes.Consumer) {
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
    top: 10,
    justifyContent: 'center',
  },
  actionItems: {
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveUser: (user) => dispatch(saveUser(user)),
    addNewUser: (user) => dispatch(addNewUser(user)),
  };
};

export default OTPModule = connect(null, mapDispatchToProps)(OTPSubmission);
