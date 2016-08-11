import { connect } from 'react-redux';
import {
  login,
  loginSuccess,
  loginFailure,
  clearLogin,
  updateLoginForm,
} from './actions';

import Login from './Login';
import { firebase } from '../app/firebase';

const mapStateToProps = (state, props) => {
  return {
    isLoading: state.login.isLoading,
    error: state.login.error,
    formValue: state.loginForm,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAuthStateChanged: (callback) => {
      return firebase.auth().onAuthStateChanged((user) => {
        callback(user);
      });
    },
    handleFormChange: (value) => {
      dispatch(updateLoginForm(value));
    },
    handleSubmit: (email, password) => {
      dispatch(login(email, password));
    },
    handleLoginSuccess: (user) => {
      dispatch(loginSuccess(user));

      props.navigator.push({
        name: 'LocationList',
      });
    },
    handleLoginEmpty: () => {
      dispatch(clearLogin());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
