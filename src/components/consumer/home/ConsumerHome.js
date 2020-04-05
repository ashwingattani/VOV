import React from 'react';
import {View, StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import {
  Header,
  Text,
  List,
  ListItem,
  Button,
  Right,
  Body,
  Title,
  Left,
  Toast,
  Root,
} from 'native-base';
import Modal from 'react-native-modal';
import Card from '../../common/Card';
import OrderList from '../../common/OrderList';

export default class ConsumerHome extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
    this.items = [
      {
        id: 0,
        name: 'Onion',
      },
      {
        id: 1,
        name: 'Potato',
      },
      {
        id: 2,
        name: 'Cauliflower',
      },
      {
        id: 3,
        name: 'Sweet Potato',
      },
      {
        id: 4,
        name: 'Coriander',
      },
      {
        id: 5,
        name: 'Spinach',
      },
      {
        id: 6,
        name: 'Lady Finger',
      },
    ];
    this.cart = [];
    this.shouldResetCards = false;
  }

  componentDidUpdate() {
    this.shouldResetCards = false;
  }

  updateQuantityForItem = (item, selectedValue) => {
    if (parseInt(selectedValue)) {
      item.selectedValue = selectedValue;
    }
    this.cart.push(item);
  };

  createOrderList = () => {
    if (this.cart.length === 0) {
      Toast.show({
        text: 'Please add items to the cart before proceeding!',
        position: 'bottom',
        type: 'warning',
        duration: 2000,
      });
    } else {
      this.setState({showModal: true});
    }
  };

  confirmOrderList = () => {
    this.cart = [];
    this.shouldResetCards = true;
    this.setState({showModal: false}, () => {
      Toast.show({
        text: 'Order generated successfully!!',
        position: 'bottom',
        type: 'success',
        duration: 2000,
      });
    });
  };

  render() {
    return (
      <Root>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Header>
            <Left />
            <Body>
              <Title>Home</Title>
            </Body>
            <Right>
              <Button hasText transparent onPress={this.createOrderList}>
                <Text>Buy</Text>
              </Button>
            </Right>
          </Header>
          <View style={styles.body}>
            <List>
              {this.items.map((item, index) => {
                return (
                  <ListItem key={index}>
                    <Card
                      shouldReset={this.shouldResetCards}
                      item={item}
                      updateQuantityForItem={this.updateQuantityForItem}
                    />
                  </ListItem>
                );
              })}
            </List>
          </View>
          <Modal isVisible={this.state.showModal} transparent={true}>
            <View style={styles.modal}>
              <OrderList items={this.cart} />
              <View style={styles.modalActions}>
                <Button onPress={this.confirmOrderList}>
                  <Text>Confirm</Text>
                </Button>
                <Button
                  onPress={() => {
                    this.setState({showModal: false});
                  }}>
                  <Text>Cancel</Text>
                </Button>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'red',
    width: '100%',
    height: 500,
  },
  modal: {
    opacity: 0.9,
    bottom: 0,
    backgroundColor: 'white',
  },
  modalActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
