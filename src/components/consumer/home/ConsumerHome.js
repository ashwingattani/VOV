import React from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Header,
  Text,
  List,
  Button,
  Right,
  Body,
  Title,
  Left,
  Root,
  Segment,
  Item,
  Icon,
  Input,
  Badge,
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import Card from '../../common/Card';
import OrderSummary from '../../common/OrderSummary';
import {
  getVegetableList,
  createOrder,
  getOpenOrders,
} from '../../../actions/OrderActions';
import {camelize, showToast} from '../../../constants/utils';
import {connect} from 'react-redux';
import {CATEGORIES} from '../../../constants/Enums';

class ConsumerHome extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showSearchBar: false,
      items: [],
      filtredItems: [],
      category: CATEGORIES.VEGGY,
      cart: [],
    };
    this.shouldResetCards = false;
    this.searchText = '';
  }

  componentDidMount() {
    if (this.state.items.length == 0) {
      this.props.getVegetableList();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.items && nextProps.items !== prevState.items) {
      let categoryItems = nextProps.items.filter((item) => {
        return item.category == camelize(prevState.category);
      });
      return {items: nextProps.items, filtredItems: categoryItems};
    } else return null;
  }

  componentDidUpdate(prevProps) {
    this.shouldResetCards = false;
    if (this.props.error && this.props.error !== prevProps.error) {
      showToast(this.props.error, 'danger');
    }
    if (this.props.newOrder && this.props.newOrder !== prevProps.newOrder) {
      showToast('Order generated successfully!', 'success');
      this.props.getOpenOrders(this.props.user);
    }
  }

  updateQuantityForItem = (item, selectedValue) => {
    let selectedValueNumber = parseInt(selectedValue);
    if (selectedValueNumber) {
      item.selectedValue = item.selectedValue
        ? item.selectedValue + selectedValueNumber
        : selectedValueNumber;
    } else {
      return;
    }

    let cartItemIndex = this.state.cart.findIndex(
      (value) => value.id === item.id,
    );
    let updatedCart = this.state.cart;
    if (cartItemIndex == -1) {
      updatedCart.push(item);
    } else {
      if (item.selectedValue == 0) {
        updatedCart.splice(cartItemIndex, 1);
      }
    }

    this.setState({
      cart: updatedCart,
      showModal: this.state.showModal ? updatedCart.length > 0 : false,
    });
  };

  updateCategory = (category) => {
    let categoryItems = this.state.items.filter((item) => {
      return item.category == camelize(category);
    });
    this.setState({category: category, filtredItems: categoryItems});
  };

  filtetSearchedItems = (search) => {
    if (search.length >= 3) {
      this.setState({
        filtredItems: this.state.filtredItems.filter((item) => {
          return (
            item.name.includes(search) ||
            item.marathiName.includes(search) ||
            item.hindiName.includes(search)
          );
        }),
      });
    } else {
      this.setState({
        filtredItems: this.state.items.filter((item) => {
          return item.category == camelize(this.state.category);
        }),
      });
    }
  };

  createOrderSummary = () => {
    if (this.state.cart.length === 0) {
      showToast('Please add items to the cart before proceeding!', 'warning');
    } else {
      this.setState({showModal: true});
    }
  };

  confirmOrderSummary = () => {
    this.props.createOrder(this.state.cart, this.props.user);
    this.shouldResetCards = true;
    this.setState({showModal: false, cart: []});
  };

  render() {
    return (
      <Root>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          {this.state.filtredItems.length == 0 && (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>No Data Found</Text>
            </View>
          )}
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => {
                  this.setState({showSearchBar: !this.state.showSearchBar});
                }}>
                <Icon name="ios-search" />
              </Button>
            </Left>
            <Body>
              <Title>Home</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.createOrderSummary}>
                <Icon name="ios-cart" />
                <Badge>
                  <Text>{this.state.cart.length}</Text>
                </Badge>
              </Button>
            </Right>
          </Header>
          {this.state.showSearchBar && (
            <Header searchBar rounded>
              <Item>
                <Icon name="ios-search" />
                <Input
                  value={this.searchText}
                  placeholder="for eg. Potato or बटाटा or आलू"
                  onChangeText={(text) => {
                    this.searchText = text;
                    this.filtetSearchedItems(text);
                  }}
                />
                <Button
                  transparent
                  onPress={() => {
                    this.searchText = '';
                    this.filtetSearchedItems('');
                  }}>
                  <Icon name="ios-close-circle-outline" />
                </Button>
              </Item>
            </Header>
          )}
          <View style={styles.body}>
            <Segment>
              <Button
                first
                active={this.state.category == CATEGORIES.VEGGY}
                onPress={() => {
                  this.updateCategory(CATEGORIES.VEGGY);
                }}>
                <Text>{CATEGORIES.VEGGY}</Text>
              </Button>
              <Button
                active={this.state.category == CATEGORIES.LEAFY_VEGGY}
                onPress={() => {
                  this.updateCategory(CATEGORIES.LEAFY_VEGGY);
                }}>
                <Text>{CATEGORIES.LEAFY_VEGGY}</Text>
              </Button>
              <Button
                last
                active={this.state.category == CATEGORIES.FRUITS}
                onPress={() => {
                  this.updateCategory(CATEGORIES.FRUITS);
                }}>
                <Text>{CATEGORIES.FRUITS}</Text>
              </Button>
            </Segment>
            <ScrollView style={styles.scrollview} keyboardDismissMode="on-drag">
              <List>
                {this.state.filtredItems &&
                  this.state.filtredItems.length > 0 &&
                  this.state.filtredItems.map((item, index) => {
                    return (
                      <Card
                        key={index}
                        shouldReset={this.shouldResetCards}
                        item={item}
                        updateQuantityForItem={this.updateQuantityForItem}
                      />
                    );
                  })}
              </List>
            </ScrollView>
          </View>
          <Modal isVisible={this.state.showModal}>
            <View style={styles.modal}>
              <OrderSummary
                items={this.state.cart}
                createOrder
                summaryAction={(item) => this.updateQuantityForItem(item, '-1')}
              />
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
          <Spinner
            visible={this.props.isLoading}
            textContent={'Loading...'}
            textStyle={{color: '#fff'}}
          />
        </SafeAreaView>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    width: '100%',
    backgroundColor: 'white',
  },
  scrollview: {
    marginBottom: 220,
  },
  modal: {
    top: 40,
    opacity: 0.9,
    marginBottom: 100,
  },
  modalActions: {
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    getVegetableList: () => dispatch(getVegetableList()),
    createOrder: (cart, user) => dispatch(createOrder(cart, user)),
    getOpenOrders: (user) => dispatch(getOpenOrders(user)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
    items: state.order.items,
    error: state.order.error,
    isLoading: state.order.isLoading,
    newOrder: state.order.newOrder,
  };
};

export default ConsumerHomeModule = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConsumerHome);
