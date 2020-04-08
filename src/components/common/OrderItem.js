import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Label, Text, Icon} from 'native-base';

export default OrderItem = props => {
  return (
    <View style={styles.body}>
      <Label>
        <Text> {props.item.date} </Text>
      </Label>
      <Icon name="ios-arrow-forward" />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
