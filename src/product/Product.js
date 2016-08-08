import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToolbarAndroid,
  TextInput,
  ToastAndroid,
} from 'react-native';

import { BackButtonIcon, Loading } from '../components';
import ProductForm from './ProductForm';

export default class Product extends Component {

  componentDidMount() {
    if (this.props.isConnected) {
      this.props.fetchProduct();
    }
  }

  getTitle() {
    return this.props.product
      ? this.props.product.name
      : 'Adicionar produto';
  }

  handleCreated = () => {
    ToastAndroid.show('Produto criado', ToastAndroid.SHORT);
    this.props.handleProductUpdated();
  };

  handleSubmit = (name, price) => {
    const product = {
      productId: this.props.productId,
      locationProductId: this.props.locationProductId,
      name: name,
      price: price,
      barcode: this.props.barcode,
      location: this.props.location,
    };
    this.props.handleSubmit(product);
  };

  render() {
    if (this.props.isFetching) {
      return (<Loading />);
    }

    return (
      <View style={styles.base}>
        <ToolbarAndroid
          navIcon={BackButtonIcon}
          onIconClicked={this.props.handleIconClicked}
          title={this.getTitle()}
          style={styles.header}
          titleColor="white" />
        <View style={styles.container}>
          <Text style={styles.title}>Cadastrar/Alterar Produto</Text>
          <View style={styles.formContainer}>
            <ProductForm
              created={this.props.created}
              onCreated={this.handleCreated}
              onSubmit={this.handleSubmit}
              navigator={this.props.navigator}
              product={this.props.product}
              locationProduct={this.props.locationProduct} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  header: {
    backgroundColor: '#009688',
    height: 56,
    flex: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
  },
  title: {
    margin: 16,
    fontSize: 20,
    color: 'black',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    flex: 0,
    alignItems: 'flex-end',
  },
  formContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
});
