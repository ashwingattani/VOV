import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {
  Header,
  Body,
  Title,
  Separator,
  List,
  Text,
  ListItem,
} from 'native-base';
import OrderItem from '../../common/OrderItem';

import {
  getOrderDetails,
  getOrderHistory,
} from '../../../actions/ConsumerActions';
import {connect} from 'react-redux';

class ConsumerOrders extends React.Component {
  constructor() {
    super();
    this.state = {
      currentOrder: {},
      orderHistory: [],
    };
  }

  componentDidMount() {
    this.props.getOrderDetails();
    this.props.getOrderHistory();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.currentOrder &&
      nextProps.currentOrder !== prevState.currentOrder
    ) {
      return {currentOrder: nextProps.currentOrder};
    } else if (
      nextProps.orderHistory &&
      nextProps.orderHistory !== prevState.orderHistory
    ) {
      return {orderHistory: nextProps.orderHistory};
    } else return null;
  }

  render() {
    return (
      <SafeAreaView>
        <Header>
          <Body>
            <Title>Orders</Title>
          </Body>
        </Header>
        <View>
          <List>
            <Separator bordered>
              <Text>Current Order</Text>
            </Separator>
            <ListItem>
              <OrderItem item={this.state.currentOrder} />
            </ListItem>
            <Separator bordered>
              <Text>Previous Orders</Text>
            </Separator>
            {this.state.orderHistory.length > 0 &&
              this.state.orderHistory.map((order, index) => {
                return (
                  <ListItem key={index}>
                    <OrderItem item={order} />
                  </ListItem>
                );
              })}
          </List>
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrderDetails: () => dispatch(getOrderDetails()),
    getOrderHistory: () => dispatch(getOrderHistory()),
  };
};

const mapStateToProps = state => {
  return {
    currentOrder: state.consumer.orderDetails,
    orderHistory: state.consumer.orderHistory,
  };
};

export default ConsumerOrdersModule = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConsumerOrders);
