import React from 'react';
import {ListItem, Label, Text, Icon, List} from 'native-base';
import {SafeAreaView, StyleSheet} from 'react-native';

export default class OrderList extends React.Component {
  constructor() {
    super();
  }

  static navigationOptions = {
    headerBackTitle: 'Orders',
  };

  render() {
    let {navigation} = this.props;
    return (
      <SafeAreaView>
        <List>
          {navigation.state.params.orders.map((order, index) => {
            return (
              <ListItem style={styles.listItem} key={index}>
                <Label>
                  <Text> {order.houseNumber} </Text>
                </Label>
                <Icon
                  onPress={() => {
                    this.props.navigation.navigate('Order Details', {order});
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
