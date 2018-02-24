/* ============
 * Base Model
 * ============
 *
 * The base for the rest of the models.
 */

class BaseModel {
  /**
   * The constructor for the base model.
   *
   * @param {Object} data The properties which are publicly accessible.
   */
  constructor(data) {
    Object.keys(data).forEach((key) => {
      this[key] = data[key];
    });
  }
}

export default BaseModel;
