import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ConsumerHome from '../components/consumer/home/ConsumerHome';
import ConsumerOrders from '../components/consumer/orders/ConsumerOrders';
import ConsumerProfile from '../components/consumer/profile/ConsumerProfile';
import {Icon} from 'native-base';

const navigator = createBottomTabNavigator(
  {
    Home: ConsumerHome,
    Orders: ConsumerOrders,
    Profile: ConsumerProfile,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        switch (routeName) {
          case 'Home':
            return <Icon name="home" />;
          case 'Orders':
            return <Icon name="albums" />;
          case 'Profile':
            return <Icon name="person" />;
          default:
            break;
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF6F00',
      inactiveTintColor: '#263238',
    },
  },
);

export default createAppContainer(navigator);
