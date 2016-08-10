import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import t from 'tcomb-form-native';
import { Button } from '../components';

const Form = t.form.Form;

import {
  LoginModel,
  options,
} from './LoginModel';

export default class LoginForm extends Component {

  onChange = (value) => {
    this.props.onFormChange(value);
  };

  handlePress = () => {
    var value = this.refs.form.getValue();
    if (value) {
      this.props.onSubmit(value.email, value.password);
    }
  };

  render() {
    return (
      <View>
        <Form
          ref="form"
          type={LoginModel}
          options={options}
          value={this.props.formValue}
          onChange={this.onChange} />
        <View style={styles.buttonContainer}>
          <Button onPress={this.handlePress}>Logar</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0,
    alignItems: 'flex-end',
  },
});
