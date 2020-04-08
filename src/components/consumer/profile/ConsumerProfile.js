import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {Label, Text, Header, Body, Title} from 'native-base';

export default class ConsumerProfile extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <Header>
          <Body>
            <Title>Profile</Title>
          </Body>
        </Header>
        <View>
          <Label>Name</Label>
          <Label>Mobile</Label>
          <Label>Address</Label>
        </View>
      </SafeAreaView>
    );
  }
}
