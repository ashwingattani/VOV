import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {Header, Title, ListItem, Label, Text, Icon, Button} from 'native-base';
import {getOpenOrders} from '../../../actions/OrderActions';
import {connect} from 'react-redux';

class SellerHome extends React.Component {
  constructor() {
    super();
    this.state = {
      currentOrders: [],
    };
  }

  static navigationOptions = {
    headerMode: 'none',
  };

  componentDidMount() {
    if (this.state.currentOrders.length == 0) {
      this.props.getOpenOrders(this.props.user);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentOrders !== prevState.currentOrders) {
      return {currentOrders: nextProps.currentOrders};
    } else return null;
  }

  render() {
    let houseList = [
      ...new Set(
        this.state.currentOrders.map((item) => item.customer.address.houseName),
      ),
    ];
    return (
      <SafeAreaView>
        <Header>
          <Left />
          <Title> Current Orders </Title>
          <Right>
            <Button
              trasparent
              onPress={() => {
                console.log(
                  'show item list and update for not available items',
                );
              }}>
              <Text>Items</Text>
            </Button>
          </Right>
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
                        orders: this.state.currentOrders.filter(
                          (order) =>
                            order.customer.address.houseName === houseName,
                        ),
                        isCurrentOrder: true,
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

const mapDispatchToProps = (dispatch) => {
  return {
    getOpenOrders: () => dispatch(getOpenOrders()),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
    currentOrders: state.order.openOrders,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerHome);
