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

import {getOpenOrders, getOrderHistory} from '../../../actions/OrderActions';
import {connect} from 'react-redux';

class ConsumerOrders extends React.Component {
  constructor() {
    super();
    this.state = {
      openOrders: [],
      orderHistory: [],
    };
  }

  componentDidMount() {
    this.props.getOpenOrders(this.props.user);
    this.props.getOrderHistory(this.props.user);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.openOrders && nextProps.openOrders !== prevState.openOrders) {
      return {openOrders: nextProps.openOrders};
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
            {this.state.openOrders.length > 0 &&
              this.state.openOrders.map((order, index) => {
                return (
                  <ListItem key={index}>
                    <OrderItem item={order} />
                  </ListItem>
                );
              })}
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

const mapDispatchToProps = (dispatch) => {
  return {
    getOpenOrders: () => dispatch(getOpenOrders()),
    getOrderHistory: () => dispatch(getOrderHistory()),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
    openOrders: state.order.openOrders,
    orderHistory: state.order.orderHistory,
  };
};

export default ConsumerOrdersModule = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConsumerOrders);
