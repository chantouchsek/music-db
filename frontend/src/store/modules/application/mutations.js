/* ============
 * Application Mutations
 * ============
 *
 * The mutations available for the application module.
 */

import {
  ADD_ALERT,
  REMOVE_ALERT,
  TOGGLE_DRAWER,
  SHOW_DRAWER,
  HIDE_DRAWER,
} from './mutation-types';

export default {
  /**
   * Mutation which will toggle the drawer.
   *
   * @param {Object} state The current state of the store.
   */
  [TOGGLE_DRAWER](state) {
    state.drawerActive = !state.drawerActive;
  },

  /**
   * Mutation which will show the drawer.
   *
   * @param {Object} state The current state of the store.
   */
  [SHOW_DRAWER](state) {
    state.drawerActive = true;
  },

  /**
   * Mutation which will hide the drawer.
   *
   * @param {Object} state The current state of the store.
   */
  [HIDE_DRAWER](state) {
    state.drawerActive = false;
  },

  /**
   * Mutation which will add a new alert.
   *
   * @param {Object} state The current state of the store.
   * @param {Object} alert The newly added alert.
   */
  [ADD_ALERT](state, alert) {
    state.alerts.push(alert);
  },


  /**
   * Mutation which will remove a alert.
   *
   * @param {Object} state The current state of the store.
   * @param {Object} alert The alert which will be removed.
   */
  [REMOVE_ALERT](state, alert) {
    state.alerts = state
      .alerts
      .filter(item => item !== alert);
  },
};
