import React from 'react';
import {
  ListItem,
  Label,
  Text,
  Icon,
  List,
  Header,
  Title,
  Button,
} from 'native-base';
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
          <Title> {params.orders[0].customer.address.houseName} </Title>
        </Header>
        <List>
          {params.orders.map((order, index) => {
            return (
              <ListItem style={styles.listItem} key={index}>
                <Label>
                  <Text> {order.customer.address.houseNumber} </Text>
                </Label>
                <Button transparent>
                  <Icon
                    name="ios-checkmark-circle-outline"
                    style={{fontSize: 30, color: 'green'}}
                  />
                </Button>
                <Button transparent>
                  <Icon
                    name="ios-close-circle-outline"
                    style={{fontSize: 30, color: 'red'}}
                  />
                </Button>
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
