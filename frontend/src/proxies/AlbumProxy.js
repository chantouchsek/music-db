import Proxy from './BaseProxy';

class AlbumProxy extends Proxy {
  /**
   * The constructor for the AlbumProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('albums', parameters);
  }

  /**
   * Method used to fetch the attached artist to the album.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  findArtist(id) {
    return this.submit('get', `/${this.endpoint}/${id}/artist`);
  }
}

export default AlbumProxy;
