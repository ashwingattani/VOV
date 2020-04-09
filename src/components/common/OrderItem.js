import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Label, Text, Icon, Button} from 'native-base';
import Modal from 'react-native-modal';
import OrderSummary from './OrderSummary';

function getDisplayFormatForDate(date) {
  return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
}

export default OrderItem = props => {
  let [render, setRender] = useState(false);
  return (
    <View
      style={styles.body}
      onTouchEnd={() => {
        if (render) {
          setRender(false);
        }
      }}>
      <Label>
        <Text> {getDisplayFormatForDate(props.item.date)} </Text>
      </Label>
      <Icon
        onPress={() => {
          setRender(true);
        }}
        name="ios-arrow-forward"
      />
      <Modal style={styles.modal} isVisible={render} transparent={true}>
        <OrderSummary items={props.item.items} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modal: {
    opacity: 0.9,
    bottom: 0,
    backgroundColor: 'white',
  },
});
