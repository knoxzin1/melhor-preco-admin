import React, {
  Component,
  PropTypes,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';

export default class Button extends Component {

  static propTypes = {
    ...TouchableNativeFeedback.propTypes,
    containerStyle: View.propTypes.style,
    disabled: PropTypes.bool,
    style: Text.propTypes.style,
    styleDisabled: Text.propTypes.style,
  };

  render() {
    return (
      <TouchableNativeFeedback {...this.props}>
        <View style={[styles.base, this.props.containerStyle]}>
          <Text style={[styles.textStyle, this.props.style]}>
            { this.props.children.toUpperCase() }
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#009688',
    minWidth: 80,
    flex: 0,
    height: 36,
    borderRadius: 2,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  textStyle: {
    color: 'white'
  }
});
