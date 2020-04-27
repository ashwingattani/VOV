import React from 'react';
import {View, StyleSheet} from 'react-native';
import {List, ListItem, Text} from 'native-base';
import {QUANTITIES} from '../../constants/Enums';

function showQuantity(item) {
  let selectedValue = QUANTITIES.find(
    (quantity) => quantity.value === item.selectedValue,
  );
  if (selectedValue) {
    return selectedValue.label;
  }
  return '';
}

export default OrderSummary = (props) => {
  return (
    <View>
      <List>
        {props.items.map((item, index) => {
          return (
            <ListItem
              key={index}
              style={[
                styles.listBox,
                !item.isAvailable == false ? styles.notAvailable : {},
              ]}>
              <Text>{item.name}</Text>
              <Text>{item.bundleSize}</Text>
              <Text>{showQuantity(item)}</Text>
            </ListItem>
          );
        })}
      </List>
    </View>
  );
};

const styles = StyleSheet.create({
  listBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notAvailable: {
    backgroundColor: 'tomato',
  },
});
