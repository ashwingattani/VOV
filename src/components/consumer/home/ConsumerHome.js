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
import OrderSummary from '../../common/OrderSummary';
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
    if (nextProps.items && nextProps.items !== prevState.items) {
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

  createOrderSummary = () => {
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

  confirmOrderSummary = () => {
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
          <Header>
            <Left />
            <Body>
              <Title>Home</Title>
            </Body>
            <Right>
              <Button hasText transparent onPress={this.createOrderSummary}>
                <Text>Buy</Text>
              </Button>
            </Right>
          </Header>
          <View style={styles.body}>
            <List>
              {this.state.items &&
                this.state.items.length > 0 &&
                this.state.items.map((item, index) => {
                  return (
                    // <ListItem key={index}>
                    <Card
                      key={index}
                      shouldReset={this.shouldResetCards}
                      item={item}
                      updateQuantityForItem={this.updateQuantityForItem}
                    />
                    // </ListItem>
                  );
                })}
            </List>
          </View>
          <Modal isVisible={this.state.showModal} transparent={true}>
            <View style={styles.modal}>
              <OrderSummary items={this.cart} />
              <View style={styles.modalActions}>
                <Button onPress={this.confirmOrderSummary}>
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

const mapDispatchToProps = dispatch => {
  return {
    getVegetableList: () => dispatch(getVegetableList()),
    createOrder: cart => dispatch(createOrder(cart)),
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
