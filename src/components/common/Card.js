import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Text,
  Picker,
  Button,
  ListItem,
  Thumbnail,
  Body,
  Right,
} from 'native-base';
import {QUANTITIES, URLS} from '../../constants/Enums';

export default class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedValue: '1',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.shouldReset) {
      return {selectedValue: '1'};
    }
  }

  addItemToCart = () => {
    this.props.updateQuantityForItem(this.props.item, this.state.selectedValue);
  };

  render() {
    let {item} = this.props;
    return (
      <ListItem thumbnail style={styles.body}>
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
          <Body style={styles.cartInfo}>
            <Text>{item.bundleSize}</Text>
            <View style={styles.cartStatus}>
              <Text note numberOfLines={1}>
                Quantity
              </Text>
              <Picker
                mode="dropdown"
                placeholderIconColor="#007aff"
                selectedValue={this.state.selectedValue}
                onValueChange={(value) => {
                  this.setState({selectedValue: value});
                }}>
                {QUANTITIES.map((quantity, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={quantity.label}
                      value={quantity.value}
                    />
                  );
                })}
              </Picker>
              <Right style={styles.addItem}>
                <Button onPress={this.addItemToCart}>
                  <Text>Add to cart</Text>
                </Button>
              </Right>
            </View>
          </Body>
        </View>
      </ListItem>
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
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cartStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addItem: {
    alignItems: 'center',
  },
});
