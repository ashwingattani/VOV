import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SellerHome from '../components/seller/home/SellerHome';
import SellerOrders from '../components/seller/orders/SellerOrders';
import SellerProfile from '../components/seller/profile/SellerProfile';

const navigator = createBottomTabNavigator(
  {
    Home: SellerHome,
    Orders: SellerOrders,
    Profile: SellerProfile,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      //   tabBarIcon: ({focused, horizontal, tintColor}) => {
      //     const {routeName} = navigation.state;
      //     if (routeName === 'Home') {
      //       return (
      //         <Image
      //           source={require('./assets/home.png')}
      //           style={{width: 20, height: 20}}
      //         />
      //       );
      //     } else {
      //       return (
      //         <Image
      //           source={require('./assets/settings.png')}
      //           style={{width: 20, height: 20}}
      //         />
      //       );
      //     }
      //   },
    }),
    tabBarOptions: {
      activeTintColor: '#FF6F00',
      inactiveTintColor: '#263238',
    },
  },
);

export default createAppContainer(navigator);
