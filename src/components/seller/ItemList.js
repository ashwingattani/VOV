import React from 'react';
import {connect} from 'react-redux';
import {getVegetableList} from '../../actions/OrderActions';
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
} from 'native-base';
import {camelize} from '../../constants/utils';
import {CATEGORIES, BASE_URLS} from '../../constants/Enums';

class ItemList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      filtredItems: [],
      category: CATEGORIES.VEGGY,
    };
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
    this.props.navigation.goBack();
  };

  render() {
    return (
      <SafeAreaView>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
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
          <ScrollView>
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
                              uri: `${BASE_URLS.imageBaseURL}${item.image}`,
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
                          <Button
                            transparent
                            onPress={() => {
                              item.isAvailable = false;
                            }}>
                            <Text>Not Available</Text>
                          </Button>
                        </View>
                      </View>
                    </ListItem>
                  );
                })}
            </List>
          </ScrollView>
        </View>
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
    flexDirection: 'row',
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVegetableList: () => dispatch(getVegetableList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
