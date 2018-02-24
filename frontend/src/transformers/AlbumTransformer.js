/* ============
 * Album Transformer
 * ============
 *
 * The transformer for a album.
 */

import Transformer from './BaseTransformer';
import Album from '@/models/Album';

class AlbumTransformer extends Transformer {
  /**
   * Method used to transform a fetched album.
   *
   * @returns {Album} An album model.
   */
  static fetch(album) {
    return new Album({
      id: album.id,
      title: album.title,
      releaseDate: album.release_date,
    });
  }

  /**
   * Method used to transform a send album.
   *
   * @returns {Object} The transformed album.
   */
  static send(album) {
    return {
      id: album.id,
      title: album.title,
      release_date: album.releaseDate,
      artist_id: album.artistId,
    };
  }
}

export default AlbumTransformer;
