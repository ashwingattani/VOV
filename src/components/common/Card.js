import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text, Picker, Item, Button} from 'native-base';
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
      <View style={styles.body}>
        <View style={styles.itemInfo}>
          <Image source="" />
          <Text> {this.props.item.name} </Text>
        </View>
        <View style={styles.quantity}>
          <Item picker>
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
          </Item>
          <Button
            onPress={() => {
              this.props.updateQuantityForItem(
                this.props.item,
                this.state.selectedValue,
              );
            }}>
            <Text>Add to cart</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: 50,
    flexDirection: 'column',
    backgroundColor: 'green',
  },
  itemInfo: {
    flexDirection: 'row',
  },
  quantity: {
    flexDirection: 'row',
    right: 0,
  },
});
