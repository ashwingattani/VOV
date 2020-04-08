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
import {getVegetableList, createOrder} from '../../../actions/ConsumerActions';
import {connect} from 'react-redux';
class ConsumerHome extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      items: [],
    };
    this.cart = [];
    this.shouldResetCards = false;
  }

  componentDidMount() {
    if (this.state.items.length == 0) {
      this.props.getVegetableList();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.items !== prevState.items) {
      return {items: nextProps.items};
    } else return null;
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
    this.props.createOrder(this.cart);
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
          <Header noLeft>
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
              {this.state.items.length > 0 &&
                this.state.items.map((item, index) => {
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
    height: 200,
    backgroundColor: 'white',
  },
  modalActions: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'scroll',
    justifyContent: 'space-around',
  },
});

const mapDispatchToProps = () => {
  return {
    getVegetableList,
    createOrder,
  };
};

const mapStateToProps = state => {
  return {
    items: state.consumer.items,
  };
};

export default ConsumerHomeModule = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConsumerHome);
