import { Organization } from '../models';

export class OrgService {
  static async create(name: string) {
    return Organization.create({ name });
  }

  static async getById(id: string) {
    return Organization.findByPk(id);
  }
}
