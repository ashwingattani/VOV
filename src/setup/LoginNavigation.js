import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../components/login/Login';
import SignUp from '../components/login/SignUp';
import OTPSubmission from '../components/login/OTPSubmission';
import ConsumerNavigation from './ConsumerNavigation';
import SellerNavigation from './SellerNavigation';

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
  },
  {
    initialRouteName: 'Login',
  },
);
export default createAppContainer(navigator);
