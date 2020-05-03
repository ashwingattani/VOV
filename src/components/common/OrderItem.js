import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Label, Text, Icon, Button, ListItem} from 'native-base';
import Modal from 'react-native-modal';
import OrderSummary from './OrderSummary';

function getDisplayFormatForDate(date) {
  return (
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  );
}

export default OrderItem = (props) => {
  let [render, setRender] = useState(false);
  return (
    <ListItem
      style={styles.body}
      onPress={() => {
        setRender(true);
      }}>
      <Label>
        <Text> {getDisplayFormatForDate(new Date(props.item.date))} </Text>
      </Label>
      <Icon name="ios-arrow-forward" />
      <Modal style={styles.modal} isVisible={render} transparent={true}>
        <OrderSummary
          items={props.item.items}
          isCurrentOrder={props.isCurrentOrder}
        />
        <Button
          style={styles.modalActions}
          onPress={() => {
            if (render) {
              setRender(false);
            }
          }}>
          <Text>Close</Text>
        </Button>
      </Modal>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modal: {
    top: 40,
    opacity: 0.9,
    marginBottom: 100,
    justifyContent: 'space-evenly',
  },
  modalActions: {
    top: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
