/* ============
 * Artist Model
 * ============
 *
 * The model for an artist.
 */

import Model from './BaseModel';

class Artist extends Model {
  /**
   * Getter for the full name of the artist.
   *
   * @returns {string} The full name of the artist.
   */
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default Artist;
