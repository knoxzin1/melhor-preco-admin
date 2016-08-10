import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ToolbarAndroid,
  ToastAndroid,
} from 'react-native';

import selectn from 'selectn';
import { Loading } from '../components';
import LoginForm from './LoginForm';

export default class Login extends Component {

  authStateObserver = null;

  componentDidMount() {
    this.authStateObserver = this.props.onAuthStateChanged(this.handleAuthStateChange);
  }

  componentWillUnmount() {
    // unsubscribe
    this.authStateObserver();
  }

  componentWillReceiveProps(props) {
    if (props.error) {
      const error = typeof props.error === 'string' ? props.error : 'Erro';
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }

  handleAuthStateChange = (user) => {
    if (user) {
      this.props.handleLoginSuccess(user);
    } else {
      this.props.handleLoginError();
    }
  };

  handleSubmit = (email, password) => {
    this.props.handleSubmit(email, password);
  };

  render() {
    if (this.props.isLoading) {
      return (<Loading />);
    }

    return (
      <View style={styles.base}>
        <ToolbarAndroid
          title="Login"
          style={styles.header}
          titleColor="white" />
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <LoginForm
              formValue={this.props.formValue}
              onSubmit={this.handleSubmit}
              onFormChange={this.props.handleFormChange} />
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
    padding: 0,
  },
  formContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
});
