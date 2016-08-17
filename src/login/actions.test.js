/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import sinon from 'sinon';
import { mockStore } from '../__mocks__/';
import {
  LOGIN_PENDING,
  LOGIN_FAILURE,
} from '../app/actionTypes';

import { assert } from 'chai';
import { login } from './actions';
import * as firebase from '../app/firebase';

describe('login/actions.js', () => {

  it('should only trigger LOGIN_PENDING', (done) => {
    const firebaseLogin = sinon.stub(firebase, 'firebaseLogin');
    firebaseLogin.returns(Promise.resolve());

    const expectedActions = [
      {
        type: LOGIN_PENDING,
      },
    ];

    const store = mockStore({
      app: {
        isConnected: true,
      },
    });

    store.dispatch(login('test@email.com', 'password'))
      .then(() => {
        assert.deepEqual(store.getActions(), expectedActions);
        firebaseLogin.restore();
      })
      .then(done);
  });

  it('should trigger LOGIN_FAILURE if anything goes wrong', (done) => {

    const error = {
      code: 'auth/invalid-email',
      message: 'Invalid login',
    };

    const firebaseLogin = sinon.stub(firebase, 'firebaseLogin');
    firebaseLogin.returns(Promise.reject(error));

    const expectedActions = [
      {
        type: LOGIN_PENDING,
      },
      {
        type: LOGIN_FAILURE,
        payload: error.message,
        error: true,
      },
    ];

    const store = mockStore({
      app: {
        isConnected: true,
      },
    });

    store.dispatch(login('test@email.com', 'password'))
      .then(() => {
        assert.deepEqual(store.getActions(), expectedActions);
        firebaseLogin.restore();
      })
      .then(done)
      .catch(done);
  });

  it('should not trigger actions if app.isConnected is falsy', (done) => {
    const store = mockStore({
      app: {
        isConnected: false,
      },
    });

    store.dispatch(login('test@email.com', 'password'))
      .then(() => {
        assert.deepEqual(store.getActions(), []);
      })
      .then(done);
  });
});
