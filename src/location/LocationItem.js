import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';

export default class LocationItem extends Component {

  render() {
    return (
      <TouchableNativeFeedback onPress={this.props.handlePress.bind(this, this.props.id)}>
        <View style={styles.base}>
          <Text style={styles.text}>{ this.props.name }</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    height: 48,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000000',
  },
});
