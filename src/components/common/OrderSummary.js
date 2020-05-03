import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {List, ListItem, Text, Button, Icon} from 'native-base';

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
              <Text lineBreakMode="tail" style={{width: 100}}>
                {item.name}
              </Text>
              <Text>{item.bundleSize}</Text>
              <Text>{parseInt(item.selectedValue)}</Text>
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
