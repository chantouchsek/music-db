/* ============
 * Artist Actions
 * ============
 *
 * The actions available for the artist module.
 */

import Vue from 'vue';
import * as types from './mutation-types';
import store from '@/store';
import Proxy from '@/proxies/ArtistProxy';
import ArtistTransformer from '@/transformers/ArtistTransformer';
import PaginationTransformer from '@/transformers/PaginationTransformer';

const proxy = new Proxy();

/**
 * Action fired when all artists will be fetched.
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
        artists: ArtistTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination),
      };

      commit(types.ALL, data);
    });
};

/**
 * Action fired when an artist will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   artist  The artist that will be created.
 */
const create = ({ commit }, artist) => {
  const transformedArtist = ArtistTransformer.send(artist);

  proxy.create(transformedArtist)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Artist has been created!',
      });

      Vue.router.push({
        name: 'artists.index',
      });
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The artist could not be created',
      });
    });
};

/**
 * Action fired when an artist has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   artist  The artist that has been created.
 */
const created = ({ commit }, artist) => {
  commit(types.CREATED, ArtistTransformer.fetch(artist));
};

/**
 * Action fired when an artist will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   artist  The artist that will be updated.
 */
const update = ({ commit }, artist) => {
  const transformedArtist = ArtistTransformer.send(artist);

  proxy.update(artist.id, transformedArtist)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Artist has been updated!',
      });

      Vue.router.push({
        name: 'artists.show',
        params: {
          artistId: artist.id,
        },
      });
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The artist could not be updated',
      });
    });
};

/**
 * Action fired when an artist has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   artist  The artist that has been updated.
 */
const updated = ({ commit }, artist) => {
  commit(types.UPDATED, ArtistTransformer.fetch(artist));
};

/**
 * Action fired when an artist will be destroyed.
 *
 * @param {function} commit    Commit function to update the store.
 * @param {Object}   artistId  The artist that will be destroyed.
 */
const destroy = ({ commit }, artistId) => {
  proxy.destroy(artistId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Artist has been destroyed!',
      });

      Vue.router.push({
        name: 'artists.index',
      });
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The artist could not be destroyed',
      });
    });
};

/**
 * Action fired when an artist has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   artist  The artist that has been destroyed.
 */
const destroyed = ({ commit }, artist) => {
  commit(types.DESTROYED, ArtistTransformer.fetch(artist));
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
