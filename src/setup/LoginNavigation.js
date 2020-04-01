import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../components/login/Login';
import SignUp from '../components/login/SignUp';
import OTPSubmission from '../components/login/OTPSubmission';
import ConsumerNavigation from './ConsumerNavigation';

const navigator = createStackNavigator(
  {
    Login: Login,
    Signup: SignUp,
    OTP: OTPSubmission,
    Consumer: ConsumerNavigation,
    // Seller: SellerNavigation,
  },
  {
    initialRouteName: 'Login',
  },
);

export default createAppContainer(navigator);
