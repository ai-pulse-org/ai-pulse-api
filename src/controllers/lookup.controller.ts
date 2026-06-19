import { Request, Response } from 'express';
import { LookupService } from '../services/lookup.service';

export class LookupController {
  private service = new LookupService();

  getCategories = async (req: Request, res: Response): Promise<void> => {
    const categories = await this.service.getCategories();
    res.status(200).json(categories);
  };
}
