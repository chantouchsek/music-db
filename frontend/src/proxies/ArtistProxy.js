import Proxy from './BaseProxy';

class ArtistProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('artists', parameters);
  }
}

export default ArtistProxy;
