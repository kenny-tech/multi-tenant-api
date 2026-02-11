import { Project } from '../models/project.model';

export class ProjectService {
  static async create(orgId: string, name: string, description?: string) {
    return Project.create({ name, description, organizationId: orgId });
  }

  static async list(orgId: string) {
    return Project.findAll({ where: { organizationId: orgId } });
  }

  static async delete(orgId: string, projectId: string) {
    const project = await Project.findOne({ where: { id: projectId, organizationId: orgId } });
    if (!project) throw new Error('Project not found');
    return project.destroy();
  }
}
