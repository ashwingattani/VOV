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
  Toast,
  Root,
  Segment,
  Item,
  Icon,
  Input,
} from 'native-base';
import Modal from 'react-native-modal';
import Card from '../../common/Card';
import OrderSummary from '../../common/OrderSummary';
import {getVegetableList, createOrder} from '../../../actions/OrderActions';
import {camelize} from '../../../constants/utils';
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
    };
    this.cart = [];
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

  componentDidUpdate() {
    this.shouldResetCards = false;
  }

  updateQuantityForItem = (item, selectedValue) => {
    if (parseInt(selectedValue)) {
      item.selectedValue = selectedValue;
    } else {
      return;
    }

    let cartItemIndex = this.cart.findIndex((value) => value.id === item.id);
    if (cartItemIndex == -1) {
      this.cart.push(item);
    } else {
      let cartItem = this.cart[cartItemIndex];
      cartItem.selectedValue = cartItem.selectedValue + item.selectedValue;
      this.cart[cartItemIndex] = cartItem;
    }
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
    if (this.cart.length === 0) {
      Toast.show({
        text: 'Please add items to the cart before proceeding!',
        position: 'bottom',
        type: 'warning',
        duration: 1000,
      });
    } else {
      this.setState({showModal: true});
    }
  };

  confirmOrderSummary = () => {
    this.props.createOrder(this.cart, this.props.user);
    this.cart = [];
    this.shouldResetCards = true;
    this.setState({showModal: false}, () => {
      Toast.show({
        text: 'Order generated successfully!!',
        position: 'bottom',
        type: 'success',
        duration: 1000,
      });
    });
  };

  render() {
    return (
      <Root>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
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
              <Button hasText transparent onPress={this.createOrderSummary}>
                <Text>Buy</Text>
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
            <ScrollView>
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

const mapDispatchToProps = (dispatch) => {
  return {
    getVegetableList: () => dispatch(getVegetableList()),
    createOrder: (cart, user) => dispatch(createOrder(cart, user)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
    items: state.order.items,
  };
};

export default ConsumerHomeModule = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConsumerHome);
