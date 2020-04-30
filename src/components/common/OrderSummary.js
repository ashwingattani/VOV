import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {List, ListItem, Text, Button, Icon} from 'native-base';
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
    <ScrollView>
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
              {props.createOrder && (
                <Button transparent onPress={() => props.summaryAction(item)}>
                  <Icon name="remove-circle-outline" />
                </Button>
              )}
            </ListItem>
          );
        })}
      </List>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingLeft: 20,
  },
  notAvailable: {
    backgroundColor: 'tomato',
  },
});
