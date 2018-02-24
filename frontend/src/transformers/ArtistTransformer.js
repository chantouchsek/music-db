/* ============
 * Artist Transformer
 * ============
 *
 * The transformer for a artist.
 */

import Transformer from './BaseTransformer';
import Artist from '@/models/Artist';

class ArtistTransformer extends Transformer {
  /**
   * Method used to transform a fetched artist.
   *
   * @returns {Artist} An artist model.
   */
  static fetch(artist) {
    return new Artist({
      id: artist.id,
      firstName: artist.first_name,
      lastName: artist.last_name,
      gender: artist.gender,
      birthday: artist.birthday,
      biography: artist.biography,
    });
  }

  /**
   * Method used to transform a send artist.
   *
   * @returns {Object} The transformed artist.
   */
  static send(artist) {
    return {
      id: artist.id,
      first_name: artist.firstName,
      last_name: artist.lastName,
      gender: artist.gender,
      birthday: artist.birthday,
      biography: artist.biography,
    };
  }
}

export default ArtistTransformer;
