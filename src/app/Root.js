import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import AppContainer from './AppContainer';

export default class Root extends Component {

  componentDidMount() {
    StatusBar.setBackgroundColor('#00796b');
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
