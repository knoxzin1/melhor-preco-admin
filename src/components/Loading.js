import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default class Loading extends Component {

  render() {
    return (
      <View style={styles.base}>
        <ActivityIndicator color="#009688" size="large" />
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
});
