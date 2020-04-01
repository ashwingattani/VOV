import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ConsumerHome from '../components/consumer/home/ConsumerHome';
import ConsumerOrders from '../components/consumer/orders/ConsumerOrders';
import ConsumerProfile from '../components/consumer/profile/ConsumerProfile';

const navigator = createBottomTabNavigator(
  {
    Home: ConsumerHome,
    Orders: ConsumerOrders,
    Profile: ConsumerProfile,
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
