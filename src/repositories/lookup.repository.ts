import { db } from '../config/knex';
import { CategoryRecord, CategoryResponse } from '../dtos/lookup.dto';

export class LookupRepository {
  private mapToResponse(row: CategoryRecord): CategoryResponse {
    return {
      id: row.id,
      category: row.category,
      sortOrder: row.sortOrder,
    };
  }

  async getCategories(): Promise<CategoryResponse[]> {
    const rows: CategoryRecord[] = await db('categories')
      .select('id', 'category', 'sort_order as sortOrder')
      .orderBy('sort_order');
    const responses = rows.map((row) => this.mapToResponse(row));
    return responses;
  }
}
