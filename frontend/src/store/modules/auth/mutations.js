/* ============
 * Artist Mutations
 * ============
 *
 * The mutations available for the artist module.
 */

import Vue from 'vue';
import {
  CHECK,
  LOGIN,
  LOGOUT,
} from './mutation-types';

export default {
  /**
   * Mutation to check if the user is authenticated.
   *
   * @param {Object} state The current state of the store.
   */
  [CHECK](state) {
    state.authenticated = !!localStorage.getItem('access_token');
    if (state.authenticated) {
      Vue.$http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    }
  },

  /**
   * Mutation to log the user in.
   *
   * @param {Object} state       The current state of the store.
   * @param {String} accessToken The access token.
   */
  [LOGIN](state, { accessToken }) {
    state.authenticated = true;
    localStorage.setItem('access_token', accessToken);
    Vue.$http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  },

  /**
   * Mutation to log the user out.
   *
   * @param {Object} state The current state of the store.
   */
  [LOGOUT](state) {
    state.authenticated = false;
    localStorage.removeItem('access_token');
    Vue.$http.defaults.headers.common.Authorization = '';
  },
};
