import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {Header, Title, ListItem, Label, Text, Icon} from 'native-base';
import {getOrderHistory} from '../../../actions/OrderActions';
import {connect} from 'react-redux';

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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.orderHistory !== prevState.orderHistory) {
      return {orderHistory: nextProps.orderHistory};
    } else return null;
  }

  render() {
    let houseList =
      this.state.orderHistory.length > 0
        ? [
            ...new Set(
              this.state.orderHistory.map(
                (item) => item.customer.address.houseName,
              ),
            ),
          ]
        : [];
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
                <ListItem style={styles.listItem} key={index}>
                  <Label>
                    <Text> {houseName} </Text>
                  </Label>
                  <Icon
                    onPress={() => {
                      this.props.navigation.navigate('Order List', {
                        orders: this.state.orderHistory.filter(
                          (order) =>
                            order.customer.address.houseName === houseName,
                        ),
                        isCurrentOrder: false,
                      });
                    }}
                    name="ios-arrow-forward"
                  />
                </ListItem>
              );
            })}
        </View>
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
  };
};

export default connect(mapStateToProps, mapDipatchToProps)(SellerOrders);
