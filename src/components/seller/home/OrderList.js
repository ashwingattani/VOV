import React from 'react';
import {connect} from 'react-redux';
import {
  ListItem,
  Label,
  Text,
  Icon,
  List,
  Header,
  Title,
  Button,
} from 'native-base';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ORDER_STATUS} from '../../../constants/Enums';
import {updateOrderStatus} from '../../../actions/OrderActions';

class OrderList extends React.Component {
  constructor() {
    super();
  }

  static navigationOptions = {
    headerBackTitle: 'Orders',
  };

  updateOrder = (order, orderStatus) => {
    order.status = orderStatus;
    this.props.updateOrderStatus(order);
  };

  render() {
    let {params} = this.props.navigation.state;
    return (
      <SafeAreaView>
        <Header>
          <Title> {params.orders[0].customer.address.houseName} </Title>
        </Header>
        <List>
          {params.orders.map((order, index) => {
            return (
              <ListItem style={styles.listItem} key={index}>
                <Label>
                  <Text> {order.customer.address.houseNumber} </Text>
                </Label>
                <Button
                  transparent
                  onPress={() => {
                    this.updateOrder(order, ORDER_STATUS.READY);
                  }}>
                  <Icon
                    name="ios-checkmark-circle-outline"
                    style={{fontSize: 30, color: 'green'}}
                  />
                </Button>
                <Button
                  transparent
                  onPress={() => {
                    this.updateOrder(order, ORDER_STATUS.FAILED);
                  }}>
                  <Icon
                    name="ios-close-circle-outline"
                    style={{fontSize: 30, color: 'red'}}
                  />
                </Button>
                <Icon
                  onPress={() => {
                    this.props.navigation.navigate('Order Details', {
                      order,
                    });
                  }}
                  name="ios-arrow-forward"
                />
              </ListItem>
            );
          })}
        </List>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateOrderStatus: (order) => dispatch(updateOrderStatus(order)),
  };
};

export default connect(null, mapDispatchToProps)(OrderList);
