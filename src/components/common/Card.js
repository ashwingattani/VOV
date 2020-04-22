import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  Text,
  Picker,
  Item,
  Button,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
} from 'native-base';
import {quantities} from '../../constants/Enums';

export default class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedValue: '1',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldReset) {
      this.setState({selectedValue: '1'});
    }
  }

  render() {
    return (
      <ListItem thumbnail style={styles.body}>
        <Left>
          <Thumbnail square source />
        </Left>
        <View style={styles.details}>
          <Body style={styles.itemInfo}>
            <Text numberOfLines={2}>{this.props.item.name}</Text>
            <Text note numberOfLines={1}>
              {this.props.item.hindiName}
            </Text>
            <Text note numberOfLines={1}>
              {this.props.item.marathiName}
            </Text>
          </Body>
          <Body style={styles.cartInfo}>
            <Text>{this.props.item.bundleSize}</Text>
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
                {quantities.map((quantity, index) => {
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
                <Button
                  transparent={true}
                  onPress={() => {
                    this.props.updateQuantityForItem(
                      this.props.item,
                      this.state.selectedValue,
                    );
                  }}>
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
