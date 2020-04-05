import React from 'react';
import {View, StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import {
  Header,
  Text,
  List,
  ListItem,
  Button,
  Right,
  Body,
  Title,
  Left,
} from 'native-base';
import Card from '../../common/Card';

export default class ConsumerHome extends React.Component {
  constructor() {
    super();
    this.items = [
      {
        id: 0,
        name: 'Onion',
      },
      {
        id: 1,
        name: 'Potato',
      },
      {
        id: 2,
        name: 'Cauliflower',
      },
      {
        id: 3,
        name: 'Sweet Potato',
      },
      {
        id: 4,
        name: 'Coriander',
      },
      {
        id: 5,
        name: 'Spinach',
      },
      {
        id: 6,
        name: 'Lady Finger',
      },
    ];
  }

  updateQuantityForItem = (item, selectedValue) => {};

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Header>
            <Left />
            <Body>
              <Title>Home</Title>
            </Body>
            <Right>
              <Button
                hasText
                transparent
                onPress={() => {
                  console.log('Proceed to buy');
                }}>
                <Text>Buy</Text>
              </Button>
            </Right>
          </Header>
          <View style={styles.body}>
            <List>
              {this.items.map((item, index) => {
                return (
                  <ListItem key={index}>
                    <Card
                      item={item}
                      updateQuantityForItem={this.updateQuantityForItem}
                    />
                  </ListItem>
                );
              })}
            </List>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'red',
    width: '100%',
    height: 500,
  },
});
