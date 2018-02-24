/* ============
 * Album Mutations
 * ============
 *
 * The mutations available for the album module.
 */

import store from '@/store';
import {
  ALL,
  CREATED,
  UPDATED,
  DESTROYED,
} from './mutation-types';

export default {
  /**
   * Mutation to update the store with the fetched albums.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  albums     The fetched albums.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL](state, { albums, pagination }) {
    state.all = albums;
    state.pagination = pagination;
  },

  /**
   * Mutation to respond to the action when an album has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} album   The album that has been created.
   */
  [CREATED](state, album) {
    const {
      totalCount,
      limit,
    } = state.pagination;

    state.pagination.totalCount += 1;

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1;
    }

    if (limit > state.all.length) {
      state.all.push(album);
    }
  },

  /**
   * Mutation to respond to the action when an album has been updated.
   *
   * @param {Object} state The current state of the store.
   * @param {Object} album The album that has been updated.
   */
  [UPDATED](state, album) {
    state.all = state.all.map((item) => {
      if (item.id === album.id) {
        return album;
      }

      return item;
    });
  },

  /**
   * Mutation to respond to the action when an album has been destroyed.
   *
   * @param {Object} state The current state of the store.
   */
  [DESTROYED](state) {
    const {
      currentPage,
      totalCount,
      limit,
      totalPages,
    } = state.pagination;

    let page = currentPage;

    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1;
    }

    store.dispatch('album/all', (proxy) => {
      proxy.setParameter('page', page);
    });
  },
};
