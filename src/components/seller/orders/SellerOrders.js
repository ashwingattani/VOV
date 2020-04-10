import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {Header, Title, ListItem, Label, Text, Icon} from 'native-base';
import {getPreviousOrders} from '../../../actions/SellerActions';
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
      this.props.getPreviousOrders();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.orderHistory !== prevState.orderHistory) {
      return {orderHistory: nextProps.orderHistory};
    } else return null;
  }

  render() {
    let houseList = [
      ...new Set(this.state.orderHistory.map(item => item.houseName)),
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
                <ListItem style={styles.listItem} key={index}>
                  <Label>
                    <Text> {houseName} </Text>
                  </Label>
                  <Icon
                    onPress={() => {
                      this.props.navigation.navigate('Order List', {
                        orders: this.state.orderHistory.filter(
                          order => order.houseName === houseName,
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

const mapDipatchToProps = dispatch => {
  return {
    getPreviousOrders: () => dispatch(getPreviousOrders()),
  };
};

const mapStateToProps = state => {
  return {
    orderHistory: state.seller.previousOrders,
  };
};

export default connect(mapStateToProps, mapDipatchToProps)(SellerOrders);
