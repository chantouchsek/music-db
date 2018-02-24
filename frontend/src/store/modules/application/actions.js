/* ============
 * Application Actions
 * ============
 *
 * The actions available for the Application module.
 */
import * as types from './mutation-types';

/**
 * Action fired to toggle the drawer.
 *
 * @param {function} commit Commit function to update the store.
 */
const toggleDrawer = ({ commit }) => {
  commit(types.TOGGLE_DRAWER);
};

/**
 * Action fired to show the drawer.
 *
 * @param {function} commit Commit function to update the store.
 */
const showDrawer = ({ commit }) => {
  commit(types.SHOW_DRAWER);
};

/**
 * Action fired to hide the drawer.
 *
 * @param {function} commit Commit function to update the store.
 */
const hideDrawer = ({ commit }) => {
  commit(types.HIDE_DRAWER);
};

/**
 * Action fired to add a new alert.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   payload The payload.
 */
const addAlert = ({ commit }, payload) => {
  commit(types.ADD_ALERT, payload);
};

/**
 * Action fired to remove an alert.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   payload The payload.
 */
const removeAlert = ({ commit }, payload) => {
  commit(types.REMOVE_ALERT, payload);
};

export default {
  toggleDrawer,
  showDrawer,
  hideDrawer,
  addAlert,
  removeAlert,
};
