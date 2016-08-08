import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import { Button } from './index';

export default class NoConnection extends Component {

  render() {
    return (
      <View style={styles.base}>
        <Image
          style={styles.icon}
          source={require('./img/wifi_off.png')}
          tintColor="#9E9E9E" />
        <Text style={styles.text}>Sem conexão com a internet, tente novamente</Text>
        <Button onPress={this.props.onPress}>tentar novamente</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    color: '#616161',
    marginBottom: 16,
    textAlign: 'center',
  },
});
