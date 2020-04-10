import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../components/login/Login';
import SignUp from '../components/login/SignUp';
import OTPSubmission from '../components/login/OTPSubmission';
import ConsumerNavigation from './ConsumerNavigation';
import SellerNavigation from './SellerNavigation';
import OrderList from '../components/seller/home/OrderList';
import OrderDetails from '../components/seller/home/OrderDetails';

const navigationOptions = ({navigation}) => ({
  header: null,
});

const navigator = createStackNavigator(
  {
    Login: Login,
    Signup: SignUp,
    OTP: OTPSubmission,
    Consumer: {screen: ConsumerNavigation, navigationOptions},
    Seller: {screen: SellerNavigation, navigationOptions},
    'Order List': OrderList,
    'Order Details': OrderDetails,
  },
  {
    initialRouteName: 'Login',
  },
);
export default createAppContainer(navigator);
