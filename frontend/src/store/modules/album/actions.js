/* ============
 * Album Actions
 * ============
 *
 * The actions available for the album module.
 */

import Vue from 'vue';
import * as types from './mutation-types';
import store from '@/store';
import Proxy from '@/proxies/AlbumProxy';
import AlbumTransformer from '@/transformers/AlbumTransformer';
import PaginationTransformer from '@/transformers/PaginationTransformer';

const proxy = new Proxy();

/**
 * Action fired when all albums will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn     Callback to edit the parameters on the proxy.
 */
const all = ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy);
  }

  proxy.all()
    .then((response) => {
      const data = {
        albums: AlbumTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination),
      };

      commit(types.ALL, data);
    });
};

/**
 * Action fired when an album will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   album   The album that will be created.
 */
const create = ({ commit }, album) => {
  const transformedAlbum = AlbumTransformer.send(album);

  proxy.create(transformedAlbum)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Album has been created!',
      });

      Vue.router.push({
        name: 'albums.index',
      });
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The album could not be created',
      });
    });
};

/**
 * Action fired when an album has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   album   The album that has been created.
 */
const created = ({ commit }, album) => {
  commit(types.CREATED, AlbumTransformer.fetch(album));
};

/**
 * Action fired when an album will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   album   The album that will be updated.
 */
const update = ({ commit }, album) => {
  const transformedAlbum = AlbumTransformer.send(album);

  proxy.update(album.id, transformedAlbum)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Album has been updated!',
      });

      Vue.router.push({
        name: 'albums.show',
        params: {
          albumId: album.id,
        },
      });
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The album could not be updated',
      });
    });
};

/**
 * Action fired when an album has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   album   The album that has been updated.
 */
const updated = ({ commit }, album) => {
  commit(types.UPDATED, AlbumTransformer.fetch(album));
};

/**
 * Action fired when an album will be destroyed.
 *
 * @param {function} commit    Commit function to update the store.
 * @param {Object}   albumId   The album that will be destroyed.
 */
const destroy = ({ commit }, albumId) => {
  proxy.destroy(albumId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Album has been destroyed!',
      });

      Vue.router.push({
        name: 'albums.index',
      });
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The album could not be destroyed',
      });
    });
};

/**
 * Action fired when an album has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   album   The album that has been destroyed.
 */
const destroyed = ({ commit }, album) => {
  commit(types.DESTROYED, AlbumTransformer.fetch(album));
};

export default {
  all,
  create,
  created,
  update,
  updated,
  destroy,
  destroyed,
};
