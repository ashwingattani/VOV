import React from 'react';
import {ListItem, Label, Text, Icon, List, Header, Title} from 'native-base';
import {SafeAreaView, StyleSheet} from 'react-native';

export default class OrderList extends React.Component {
  constructor() {
    super();
  }

  static navigationOptions = {
    headerBackTitle: 'Orders',
  };

  render() {
    let {params} = this.props.navigation.state;
    return (
      <SafeAreaView>
        <Header>
          <Title> {params.orders[0].houseName} </Title>
        </Header>
        <List>
          {params.orders.map((order, index) => {
            return (
              <ListItem style={styles.listItem} key={index}>
                <Label>
                  <Text> {order.houseNumber} </Text>
                </Label>
                <Icon
                  onPress={() => {
                    this.props.navigation.navigate('Order Details', {
                      order,
                      isCurrentOrder: params.isCurrentOrder,
                    });
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
