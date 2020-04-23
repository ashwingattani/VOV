import React from 'react';
import {View, StyleSheet} from 'react-native';
import {List, ListItem, Text} from 'native-base';
import {QUANTITIES} from '../../constants/Enums';

export default OrderSummary = (props) => {
  return (
    <View>
      <List>
        {props.items.map((item, index) => {
          return (
            <ListItem key={index} style={styles.listBox}>
              <Text>{item.name}</Text>
              <Text>{item.bundleSize}</Text>
              <Text>
                {
                  QUANTITIES.find(
                    (quantity) => quantity.value === item.selectedValue,
                  ).label
                }
              </Text>
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
});
