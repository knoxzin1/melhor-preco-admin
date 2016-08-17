import React, {
  Component,
  PropTypes,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ToolbarAndroid,
  TextInput,
} from 'react-native';

import BarcodeScanner from 'react-native-barcodescanner';
import { BackButtonIcon, Button } from '../components';

export default class Location extends Component {

  static propTypes = {
    scannerOpen: PropTypes.bool.isRequired,
    productDetails: PropTypes.func.isRequired,
    productDetailsScanner: PropTypes.func.isRequired,
    closeScanner: PropTypes.func.isRequired,
    openScanner: PropTypes.func.isRequired,
    handleIconClicked: PropTypes.func.isRequired,
    location: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    if (this.props.scannerOpen) {
      return (
        <View style={styles.base}>
          <BarcodeScanner
            onBarCodeRead={this.props.productDetailsScanner}
            style={styles.base}
            torchMode="off"
            cameraType="back" />
          <View style={styles.scannerCloseButtonContainer}>
            <Button onPress={this.props.closeScanner}>fechar</Button>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.base}>
        <ToolbarAndroid
          navIcon={BackButtonIcon}
          onIconClicked={this.props.handleIconClicked}
          title={this.props.location.name}
          style={styles.header}
          titleColor="white" />
        <View style={styles.container}>
          <Text style={styles.title}>Cadastrar/Alterar Produto</Text>
          <Text style={styles.subtitle}>Digite o código de barra:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Código de barra"
            onSubmitEditing={this.props.productDetails} />
          <Text style={styles.subtitle}>ou use sua câmera</Text>
          <View style={styles.buttonContainer}>
            <Button onPress={this.props.openScanner}>capturar código de barra</Button>
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
    padding: 16,
  },
  title: {
    fontSize: 20,
    color: 'black',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
  },
  buttonContainer: {
    flex: 0,
    alignItems: 'flex-start',
    marginTop: 16,
  },
  scannerCloseButtonContainer: {
    marginTop: 16,
    marginBottom: 16,
    flex: 0,
    alignItems: 'center',
  },
});
