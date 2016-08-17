import React, {
  Component,
  PropTypes,
} from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import t from 'tcomb-form-native';
import { Button } from '../components';

const Form = t.form.Form;

import {
  ProductModel,
  options,
} from './ProductModel';

export default class ProductForm extends Component {

  static propTypes = {
    created: PropTypes.bool.isRequired,
    onCreated: PropTypes.func.isRequired,
    onFormChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    formValue: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.string,
    }),
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.created && nextProps.created) {
      this.props.onCreated();
    }
  }

  onChange = (value) => {
    this.props.onFormChange(value);
  };

  handlePress = () => {
    var value = this.refs.form.getValue();
    if (value) {
      this.props.onSubmit(value.name, value.price);
    }
  };

  render() {
    return (
      <View>
        <Form
          ref="form"
          type={ProductModel}
          options={options}
          value={this.props.formValue}
          onChange={this.onChange} />
        <View style={styles.buttonContainer}>
          <Button onPress={this.handlePress}>Salvar</Button>
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
