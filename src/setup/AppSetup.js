import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Login from '../components/login/Login';

export default class AppSetup extends Component {
  render() {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    );
  }
}
