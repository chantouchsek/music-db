import Proxy from './BaseProxy';

class SongProxy extends Proxy {
  /**
   * The constructor for the SongProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('songs', parameters);
  }

  /**
   * Method used to fetch the attached album to the song.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  findAlbum(id) {
    return this.submit('get', `/${this.endpoint}/${id}/album`);
  }
}

export default SongProxy;
