/* ============
 * Artist Mutations
 * ============
 *
 * The mutations available for the artist module.
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
   * Mutation to update the store with the fetched artists.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  artists    The fetched artists.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL](state, { artists, pagination }) {
    state.all = artists;
    state.pagination = pagination;
  },

  /**
   * Mutation to respond to the action when an artist has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} artist  The artist that has been created.
   */
  [CREATED](state, artist) {
    const {
      totalCount,
      limit,
    } = state.pagination;

    state.pagination.totalCount += 1;

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1;
    }

    if (limit > state.all.length) {
      state.all.push(artist);
    }
  },

  /**
   * Mutation to respond to the action when an artist has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} artist The artist that has been updated.
   */
  [UPDATED](state, artist) {
    state.all = state.all.map((item) => {
      if (item.id === artist.id) {
        return artist;
      }

      return item;
    });
  },

  /**
   * Mutation to respond to the action when an artist has been destroyed.
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

    // Check if the artist is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1;
    }

    store.dispatch('artist/all', (proxy) => {
      proxy.setParameter('page', page);
    });
  },
};
