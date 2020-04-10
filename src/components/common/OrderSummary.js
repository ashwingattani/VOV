import React from 'react';
import {View, StyleSheet} from 'react-native';
import {List, ListItem, Text} from 'native-base';
import {quantities} from '../../constants/Enums';

export default OrderSummary = props => {
  return (
    <View>
      <List>
        {props.items.map((item, index) => {
          return (
            <View key={index} style={styles.listBox}>
              <ListItem>
                <Text>{item.name}</Text>
                <Text>
                  {
                    quantities.find(
                      quantity => quantity.value === item.selectedValue,
                    ).label
                  }
                </Text>
              </ListItem>
              {props.accessoryView ? props.accessoryView : <></>}
            </View>
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
