import React, { Component } from 'react';
import {
  Navigator,
  BackAndroid,
  DrawerLayoutAndroid,
  NetInfo,
} from 'react-native';

import { Loading } from '../components';

// Routes
import {
  LocationListContainer,
  LocationContainer,
} from '../location';

import { ProductContainer } from '../product';
import { LoginContainer } from '../login';

// Back button handler
let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

export default class App extends Component {

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this.handleConnectionInfoChange);
    NetInfo.isConnected.fetch().done((isConnected) => {

      if (isConnected) {
        this.props.actions.checkOfflineProducts();
      } else {
        this.props.actions.checkOfflineProductsSuccess();
      }

      this.handleConnectionInfoChange(isConnected);
    });
  }

  handleConnectionInfoChange = (isConnected) => {
    if (isConnected) {
      this.props.actions.setOnline();
    } else {
      this.props.actions.setOffline();
    }
  };

  renderScene(route, navigator) {
    var key = '__navigatorRouteID';

    _navigator = navigator;

    const component = route.name;
    const passAhead = {
      navigatorKey: route[key] ? route[key] : null,
      ...route,
      navigator,
    };

    switch (component) {
      case 'LocationList':
        return (<LocationListContainer {...passAhead} />);
      case 'Location':
        return (<LocationContainer {...passAhead} />);
      case 'Product':
        return (<ProductContainer {...passAhead} />);
      case 'Login':
        return (<LoginContainer {...passAhead} />);
      default:
        return false;
    }
  }

  render() {
    if (this.props.isStarting
     || !this.props.isRehydrated
     || typeof this.props.isConnected === 'undefined'
    ) {
      return (<Loading />);
    }

    return (
      <Navigator
        renderScene={this.renderScene}
        initialRoute={{
          name: 'Login'
        }}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid} />
    );
  }
}
