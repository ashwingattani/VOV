import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text, Picker, Item, Button} from 'native-base';

const Quantities = [
  {label: '100gms', value: '0'},
  {label: '250gms', value: '1'},
  {label: '500gms', value: '2'},
  {label: '750gms', value: '3'},
  {label: '1kg', value: '4'},
];

export default class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedValue: '0',
    };
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
              // iosIcon={<Icon name="arrow-down" />}
              style={{width: undefined}}
              // placeholder={
              //   Quantities.find(item => item.value === this.state.selectedValue)
              //     .label
              // }
              placeholderStyle={{color: '#bfc6ea'}}
              placeholderIconColor="#007aff"
              selectedValue={this.state.selectedValue}
              onValueChange={value => {
                this.setState({selectedValue: value});
              }}>
              {Quantities.map((quantity, index) => {
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
    // justifyContent: 'space-around',
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
