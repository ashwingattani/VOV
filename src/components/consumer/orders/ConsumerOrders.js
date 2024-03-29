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
  Right,
  Button,
  Icon,
  Left,
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import OrderItem from '../../common/OrderItem';
import {getOpenOrders, getOrderHistory} from '../../../actions/OrderActions';
import {connect} from 'react-redux';
import {showToast} from '../../../constants/utils';

class ConsumerOrders extends React.Component {
  constructor() {
    super();
    this.state = {
      openOrders: [],
      orderHistory: [],
    };
  }

  componentDidMount() {
    this.fetchOrders();
  }

  componentDidUpdate(prevProps) {
    if (this.props.error && this.props.error !== prevProps.error) {
      showToast(this.props.error, 'danger');
    }
  }

  fetchOrders = () => {
    this.props.getOpenOrders(this.props.user);
    this.props.getOrderHistory(this.props.user);
  };

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
          <Left />
          <Body>
            <Title>Orders</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.setState({openOrders: [], orderHistory: []}, () => {
                  this.fetchOrders();
                });
              }}>
              <Icon name="ios-refresh" />
            </Button>
          </Right>
        </Header>
        <View>
          <List>
            {this.state.openOrders.length > 0 && (
              <Separator bordered>
                <Text>Current Order</Text>
              </Separator>
            )}
            {this.state.openOrders.length > 0 &&
              this.state.openOrders.map((order, index) => {
                return (
                  <OrderItem key={index} item={order} isCurrentOrder={true} />
                );
              })}
            {this.state.orderHistory.length > 0 && (
              <Separator bordered>
                <Text>Previous Orders</Text>
              </Separator>
            )}
            {this.state.orderHistory.length > 0 &&
              this.state.orderHistory.map((order, index) => {
                return <OrderItem key={index} item={order} />;
              })}
          </List>
        </View>
        {this.state.openOrders.length == 0 &&
          this.state.orderHistory.length == 0 && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>No Data Found</Text>
            </View>
          )}
        <Spinner
          visible={this.props.isLoading}
          textContent={'Loading...'}
          textStyle={{color: '#fff'}}
        />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOpenOrders: (user) => dispatch(getOpenOrders(user)),
    getOrderHistory: (user) => dispatch(getOrderHistory(user)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
    openOrders: state.order.openOrders,
    orderHistory: state.order.orderHistory,
    error: state.order.error,
    isLoading: state.order.isLoading,
  };
};

export default ConsumerOrdersModule = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConsumerOrders);
