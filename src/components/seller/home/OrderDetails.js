import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Header, Left, Text, Right, Body, View, Button} from 'native-base';
import OrderSummary from '../../common/OrderSummary';

export default class OrderDetails extends React.Component {
  constructor() {
    super();
  }

  render() {
    let {order, isCurrentOrder} = this.props.navigation.state.params;
    return (
      <SafeAreaView>
        <Header>
          <Left>
            <Text>House Number</Text>
            <Text note numberOfLines={1}>
              {order.customer.address.houseNumber}
            </Text>
          </Left>
          <Right>
            <Body style={styles.rightItem}>
              <Text>House Name</Text>
              <Text note numberOfLines={1}>
                {order.customer.address.houseName}
              </Text>
            </Body>
          </Right>
        </Header>
        <View>
          <OrderSummary
            style={{top: 200}}
            items={order.items}
            accessoryView={
              isCurrentOrder ? (
                <Button
                  style={{alignSelf: 'center'}}
                  transparent
                  small
                  onPress={() => {
                    console.log('not available');
                  }}>
                  <Text>Not Available</Text>
                </Button>
              ) : (
                <></>
              )
            }
          />
          {isCurrentOrder ? (
            <View style={styles.actions}>
              <Button
                success
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Text>Delivered</Text>
              </Button>
              <Button
                danger
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Text>Not Delivered</Text>
              </Button>
            </View>
          ) : (
            <></>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  rightItem: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  actions: {
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
