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
      <ListItem thumbnail>
        <Left>
          <Thumbnail square source />
        </Left>
        <Body style={styles.itemInfo}>
          <Text>{this.props.item.name}</Text>
          <Text note numberOfLines={1}>
            {this.props.item.name} {/* will contain marathi name later */}
          </Text>
        </Body>
        <Right style={styles.quantity}>
          <Picker
            mode="dropdown"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            selectedValue={this.state.selectedValue}
            onValueChange={value => {
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
    height: 50,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  itemInfo: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantity: {
    flexDirection: 'row',
    right: 0,
    alignItems: 'center',
  },
});
