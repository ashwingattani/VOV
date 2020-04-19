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
        <Body style={styles.itemInfo}>
          <Text numberOfLines={2}>{this.props.item.name}</Text>
          <Text note numberOfLines={1}>
            {this.props.item.name} {/* will contain hindi name later */}
          </Text>
          <Text note numberOfLines={1}>
            {this.props.item.name} {/* will contain marathi name later */}
          </Text>
        </Body>
        <Body style={styles.itemInfo}>
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
        </Body>
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
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    borderBottomWidth: 1,
  },
  itemInfo: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0,
  },
  addItem: {
    flexDirection: 'row',
    right: 0,
    alignItems: 'center',
    borderBottomWidth: 0,
  },
});
