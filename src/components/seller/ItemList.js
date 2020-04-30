import React from 'react';
import {connect} from 'react-redux';
import {
  getVegetableList,
  updateItemsForOrder,
} from '../../actions/OrderActions';
import {StyleSheet, ScrollView, SafeAreaView, View} from 'react-native';
import {
  Segment,
  Button,
  Text,
  List,
  ListItem,
  Header,
  Left,
  Right,
  Body,
  Title,
  Thumbnail,
  CheckBox,
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import {camelize} from '../../constants/utils';
import {CATEGORIES, URLS} from '../../constants/Enums';

class ItemList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      filtredItems: [],
      category: CATEGORIES.VEGGY,
    };
    this.unAvailableItems = [];
  }

  static navigationOptions = {
    headerMode: 'none',
  };

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

  updateCategory = (category) => {
    let categoryItems = this.state.items.filter((item) => {
      return item.category == camelize(category);
    });
    this.setState({category: category, filtredItems: categoryItems});
  };

  updateOrdersStatus = () => {
    if (this.unAvailableItems.length > 0) {
      this.props.currentOrders.forEach((order) => {
        this.props.updateItemsForOrder(order, this.unAvailableItems);
      });
    }
    this.props.navigation.goBack();
  };

  addItemToUnavailableList = (item) => {
    let index = this.unAvailableItems.findIndex((value) => {
      return value.id == item.id;
    });
    if (index == -1) {
      item.isAvailable = false;
      this.unAvailableItems.push(item);
    } else {
      item.isAvailable = true;
      this.unAvailableItems.pop(item);
    }

    let newList = this.state.filtredItems;
    let filterIndex = newList.findIndex((value) => {
      return value.id == item.id;
    });
    newList[filterIndex] = item;
    this.setState({filtredItems: newList});
  };

  render() {
    return (
      <SafeAreaView>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.unAvailableItems = [];
                this.setState({items: [], filtredItems: []}, () => {
                  this.props.navigation.goBack();
                });
              }}>
              <Text> Cancel </Text>
            </Button>
          </Left>
          <Body>
            <Title> Items </Title>
          </Body>
          <Right>
            <Button hasText transparent onPress={this.updateOrdersStatus}>
              <Text> Done </Text>
            </Button>
          </Right>
        </Header>
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
          <ScrollView keyboardDismissMode="on-drag">
            <List>
              {this.state.filtredItems &&
                this.state.filtredItems.length > 0 &&
                this.state.filtredItems.map((item, index) => {
                  return (
                    <ListItem thumbnail style={styles.body} key={index}>
                      <View style={styles.details}>
                        <Body style={styles.itemInfo}>
                          <Thumbnail
                            square
                            large
                            source={{
                              uri: `${URLS.imageBaseURL}${item.image}`,
                            }}
                          />
                          <View style={styles.nameFields}>
                            <Text numberOfLines={2}>{item.name}</Text>
                            <Text note numberOfLines={1}>
                              {item.hindiName}
                            </Text>
                            <Text note numberOfLines={1}>
                              {item.marathiName}
                            </Text>
                          </View>
                        </Body>
                        <View style={styles.cartInfo}>
                          <Text>{item.bundleSize}</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text>Not Available</Text>
                            <CheckBox
                              style={{left: 15}}
                              checked={item.isAvailable == false}
                              onPress={() =>
                                this.addItemToUnavailableList(item)
                              }
                            />
                          </View>
                        </View>
                      </View>
                    </ListItem>
                  );
                })}
            </List>
          </ScrollView>
        </View>
        {this.state.items.length == 0 && (
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
  body: {
    borderBottomWidth: 1,
  },
  details: {
    width: '100%',
    flexDirection: 'column',
  },
  nameFields: {
    left: 20,
    flexDirection: 'column',
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 30,
  },
  cartStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addItem: {
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    items: state.order.items,
    currentOrders: state.order.openOrders,
    isLoading: state.order.isLoading,
    error: state.order.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVegetableList: () => dispatch(getVegetableList()),
    updateItemsForOrder: (id, items) =>
      dispatch(updateItemsForOrder(id, items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
