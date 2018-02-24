/* ============
 * Auth Transformer
 * ============
 *
 * The transformer for the authentication.
 */

import Transformer from './BaseTransformer';
import Auth from '@/models/Auth';

class AuthTransformer extends Transformer {
  /**
   * Method used to transform the fetched authentication data.
   *
   * @returns {Auth} The auth model.
   */
  static fetch(auth) {
    return new Auth({
      tokenType: auth.token_type,
      expiresIn: auth.expires_in,
      accessToken: auth.access_token,
      refreshToken: auth.refresh_token,
    });
  }

  /**
   * Method used to transform the send authentication data.
   *
   * @returns {Object} The transformed authentication data.
   */
  static send(auth) {
    return {
      token_type: auth.tokenType,
      expires_in: auth.expiresIn,
      access_token: auth.accessToken,
      refresh_token: auth.refreshToken,
    };
  }
}

export default AuthTransformer;
