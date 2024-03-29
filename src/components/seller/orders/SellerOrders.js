import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {Header, Title, ListItem, Label, Text, Icon} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import {getOrderHistory} from '../../../actions/OrderActions';
import {connect} from 'react-redux';
import {showToast} from '../../../constants/utils';

class SellerOrders extends React.Component {
  constructor() {
    super();
    this.state = {
      orderHistory: [],
    };
  }

  componentDidMount() {
    if (this.state.orderHistory.length == 0) {
      this.props.getOrderHistory(this.props.user);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.error && this.props.error !== prevProps.error) {
      showToast(this.props.error, 'danger');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.orderHistory &&
      nextProps.orderHistory !== prevState.orderHistory
    ) {
      return {orderHistory: nextProps.orderHistory};
    } else return null;
  }

  render() {
    let houseList = [
      ...new Set(
        this.state.orderHistory.map((item) => item.customer.address.houseName),
      ),
    ];
    return (
      <SafeAreaView>
        <Header>
          {/* <Left /> */}
          <Title> Previous Orders </Title>
          {/* <Right /> */}
        </Header>
        <View>
          {houseList &&
            houseList.length > 0 &&
            houseList.map((houseName, index) => {
              return (
                <ListItem
                  style={styles.listItem}
                  key={index}
                  onPress={() => {
                    this.props.navigation.navigate('Order List', {
                      orders: this.state.orderHistory.filter(
                        (order) =>
                          order.customer.address.houseName === houseName,
                      ),
                    });
                  }}>
                  <Label>
                    <Text> {houseName} </Text>
                  </Label>
                  <Icon name="ios-arrow-forward" />
                </ListItem>
              );
            })}
        </View>
        {this.state.orderHistory.length == 0 && (
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

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const mapDipatchToProps = (dispatch) => {
  return {
    getOrderHistory: (user) => dispatch(getOrderHistory(user)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
    orderHistory: state.order.orderHistory,
    error: state.order.error,
    isLoading: state.order.isLoading,
  };
};

export default connect(mapStateToProps, mapDipatchToProps)(SellerOrders);
