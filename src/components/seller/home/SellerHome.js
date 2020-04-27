import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Header,
  Title,
  ListItem,
  Label,
  Text,
  Icon,
  Button,
  Left,
  Right,
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
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
    if (
      nextProps.currentOrders &&
      nextProps.currentOrders !== prevState.currentOrders
    ) {
      return {currentOrders: nextProps.currentOrders};
    } else return null;
  }

  showItemList = () => {
    this.props.navigation.navigate('Items');
  };

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
            <Button transparent onPress={this.showItemList}>
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
                      });
                    }}
                    name="ios-arrow-forward"
                  />
                </ListItem>
              );
            })}
        </View>
        {this.state.currentOrders.length == 0 && (
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

const mapDispatchToProps = (dispatch) => {
  return {
    getOpenOrders: (user) => dispatch(getOpenOrders(user)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
    currentOrders: state.order.openOrders,
    error: state.order.error,
    isLoading: state.order.isLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerHome);
