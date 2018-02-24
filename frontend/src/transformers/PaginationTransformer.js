/* ============
 * Pagination Transformer
 * ============
 *
 * The transformer for the pagination.
 */

import Transformer from './BaseTransformer';
import Pagination from '@/models/Pagination';

class PaginationTransformer extends Transformer {
  /**
   * Method used to transform the fetched pagination.
   *
   * @param {Object} pagination The fetched pagination.
   *
   * @returns {Object} The transformed pagination.
   */
  static fetch(pagination) {
    return new Pagination({
      totalCount: pagination.total_count,
      totalPages: pagination.total_pages,
      currentPage: pagination.current_page,
      limit: pagination.limit,
    });
  }

  /**
   * Method used to transform a send pagination.
   *
   * @param {Pagination} pagination The pagination to be send.
   *
   * @returns {Object} The transformed pagination.
   */
  static send(pagination) {
    return {
      total_count: pagination.totalCount,
      total_pages: pagination.totalPages,
      current_page: pagination.currentPage,
      limit: pagination.limit,
    };
  }
}

export default PaginationTransformer;
