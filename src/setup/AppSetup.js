import React, {Component} from 'react';
import {Provider} from 'react-redux';
// import store from './store';
import LoginNavigation from './LoginNavigation';

export default class AppSetup extends Component {
  render() {
    // store={store}
    return (
      // <Provider>
      <LoginNavigation />
      // </Provider>
    );
  }
}
