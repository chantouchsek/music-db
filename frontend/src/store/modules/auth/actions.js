/* ============
 * Artist Actions
 * ============
 *
 * The actions available for the artist module.
 */

import Vue from 'vue';
import * as types from './mutation-types';
import store from '@/store';
import Proxy from '@/proxies/AuthProxy';
import AuthTransformer from '@/transformers/AuthTransformer';

const proxy = new Proxy();

/**
 * Action which will check the authentication.
 *
 * @param {function} commit Commit function to update the store.
 */
export const check = ({ commit }) => {
  commit(types.CHECK);
};

/**
 * Action which will try to login the user.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   payload The payload.
 */
export const login = ({ commit }, payload) => {
  proxy.login(payload)
    .then((response) => {
      commit(types.LOGIN, AuthTransformer.fetch(response));

      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Login successful!',
      });

      Vue.router.push({
        name: 'artists.index',
      });
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'Could not login',
      });
    });
};

/**
 * Action which will try to logout the user.
 *
 * @param {function} commit Commit function to update the store.
 */
export const logout = ({ commit }) => {
  commit(types.LOGOUT);

  store.dispatch('application/addAlert', {
    type: 'success',
    message: 'Logout successful!',
  });

  Vue.router.push({
    name: 'login.index',
  });
};

export default {
  check,
  login,
  logout,
};
