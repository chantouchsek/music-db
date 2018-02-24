/* ============
 * Song Transformer
 * ============
 *
 * The transformer for a song.
 */

import Transformer from './BaseTransformer';
import Song from '@/models/Song';

class SongTransformer extends Transformer {
  /**
   * Method used to transform a fetched song.
   *
   * @returns {Song} A song model.
   */
  static fetch(song) {
    return new Song({
      id: song.id,
      title: song.title,
    });
  }

  /**
   * Method used to transform a send song.
   *
   * @returns {Object} The transformed song.
   */
  static send(song) {
    return {
      id: song.id,
      title: song.title,
      album_id: song.albumId,
    };
  }
}

export default SongTransformer;
