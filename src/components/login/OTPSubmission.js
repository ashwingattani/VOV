import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet, View} from 'react-native';
import {Item, Label, Input, Button, Text} from 'native-base';

export default class OTPSubmission extends React.Component {
  constructor() {
    super();
    this.otp = '';
  }

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
                onChangeText={text => {
                  this.otp.concat(text);
                }}
              />
            </Item>
            <View style={styles.actionItems}>
              <Button
                rounded
                onPress={() => {
                  if (navigation.state.params.userType === 'Consumer') {
                    navigation.navigate('Consumer');
                  } else {
                    navigation.navigate('Seller');
                  }
                }}>
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
