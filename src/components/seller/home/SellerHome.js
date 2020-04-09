import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {Header, Title, ListItem, Label, Text, Icon} from 'native-base';
import {getCurrentOrders} from '../../../actions/SellerActions';
import {connect} from 'react-redux';

class SellerHome extends React.Component {
  constructor() {
    super();
    this.state = {
      currentOrders: [],
    };
  }

  componentDidMount() {
    if (this.state.currentOrders.length == 0) {
      this.props.getCurrentOrders();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentOrders !== prevState.currentOrders) {
      return {currentOrders: nextProps.currentOrders};
    } else return null;
  }

  render() {
    let houseList = [
      ...new Set(this.state.currentOrders.map(item => item.houseName)),
    ];
    return (
      <SafeAreaView>
        <Header>
          {/* <Left /> */}
          <Title> Current Orders </Title>
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
                  <Icon onPress={() => {}} name="ios-arrow-forward" />
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

const mapDispatchToProps = dispatch => {
  return {
    getCurrentOrders: () => dispatch(getCurrentOrders()),
  };
};

const mapStateToProps = state => {
  return {
    currentOrders: state.seller.currentOrders,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerHome);
