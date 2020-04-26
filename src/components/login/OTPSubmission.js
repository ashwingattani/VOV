import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Item, Label, Input, Button, Text} from 'native-base';
import {saveUser, addNewUser} from '../../actions/UserActions';
import {connect} from 'react-redux';
import {USER_TYPES} from '../../constants/Enums';

class OTPSubmission extends React.Component {
  constructor() {
    super();
    this.state = {
      verificationCode: '',
    };
  }

  verifyOTP = () => {
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

          if (user.type === USER_TYPES.Consumer) {
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
                maxLength={6}
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

const mapStateToProps = (state) => {
  return {
    isLoading: state.user.isLoading,
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUser: (user) => dispatch(saveUser(user)),
    addNewUser: (user) => dispatch(addNewUser(user)),
  };
};

export default OTPModule = connect(null, mapDispatchToProps)(OTPSubmission);
mapStateToProps;
