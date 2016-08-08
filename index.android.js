import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import Root from './src/app/Root';

class MelhorPrecoAdmin extends Component {
  render() {
    return (<Root />);
  }
}

AppRegistry.registerComponent('MelhorPrecoAdmin', () => MelhorPrecoAdmin);
