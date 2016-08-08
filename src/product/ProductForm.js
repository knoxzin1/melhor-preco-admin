import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import t from 'tcomb-form-native';
import { Button } from '../components';

const Form = t.form.Form;

import {
  ProductModel,
  options,
} from './ProductModel';

export default class ProductForm extends Component {

  state = {
    value: {
      name: '',
      price: '',
    },
  };

  resetFormState() {
    this.setState({
      value: {
        name: '',
        price: '',
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.product && nextProps.product) {
      this.setState({
        value: {
          name: nextProps.product.name,
          price: nextProps.locationProduct
            ? nextProps.locationProduct.price.toString()
            : this.state.form.price,
        }
      });
    }

    if (!nextProps.product) {
      this.resetFormState();
    }

    if (!this.props.created && nextProps.created) {
      this.props.onCreated();
    }
  }

  onChange = (value) => {
    this.setState({value});
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
          value={this.state.value}
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
