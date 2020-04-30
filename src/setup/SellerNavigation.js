import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SellerHome from '../components/seller/home/SellerHome';
import SellerOrders from '../components/seller/orders/SellerOrders';
import SellerProfile from '../components/seller/profile/SellerProfile';
import {Icon} from 'native-base';

const navigator = createBottomTabNavigator(
  {
    Home: SellerHome,
    'Order History': SellerOrders,
    Profile: SellerProfile,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        switch (routeName) {
          case 'Home':
            return <Icon name="home" />;
          case 'Order History':
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
