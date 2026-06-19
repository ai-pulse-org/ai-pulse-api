import { CategoryResponse } from '../dtos/lookup.dto';
import { LookupRepository } from '../repositories/lookup.repository';

export class LookupService {
  private repository = new LookupRepository();

  async getCategories(): Promise<CategoryResponse[]> {
    return this.repository.getCategories();
  }
}
