import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './store';
import LoginNavigation from './LoginNavigation';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async () => {});

export default class AppSetup extends Component {
  render() {
    return (
      <Provider store={store}>
        <LoginNavigation />
      </Provider>
    );
  }
}
