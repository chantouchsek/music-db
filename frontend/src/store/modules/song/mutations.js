/* ============
 * Song Mutations
 * ============
 *
 * The mutations available for the song module.
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
   * Mutation to update the store with the fetched songs.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  songs      The fetched songs.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL](state, { songs, pagination }) {
    state.all = songs;
    state.pagination = pagination;
  },

  /**
   * Mutation to respond to the action when a song has been created.
   *
   * @param {Object} state The current state of the store.
   * @param {Object} song  The song that has been created.
   */
  [CREATED](state, song) {
    const {
      totalCount,
      limit,
    } = state.pagination;

    state.pagination.totalCount += 1;

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1;
    }

    if (limit > state.all.length) {
      state.all.push(song);
    }
  },

  /**
   * Mutation to respond to the action when a song has been updated.
   *
   * @param {Object} state The current state of the store.
   * @param {Object} song  The song that has been updated.
   */
  [UPDATED](state, song) {
    state.all = state.all.map((item) => {
      if (item.id === song.id) {
        return song;
      }

      return item;
    });
  },

  /**
   * Mutation to respond to the action when a song has been destroyed.
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

    store.dispatch('song/all', (proxy) => {
      proxy.setParameter('page', page);
    });
  },
};
