import { createProjectModel, IProject } from "@models/Project.model";
import { DatabaseService } from "@services/common/databaseService";
import { Model } from "mongoose";
import { Service } from "typedi";

@Service()
export class ProjectRepository {
  private ProjectModel: Model<IProject> | null = null;
  constructor(private dbService: DatabaseService) {}

  private async ensureModel(): Promise<Model<IProject>> {
    if (!this.ProjectModel) {
      const connection = await this.dbService.getConnection();
      this.ProjectModel = createProjectModel(connection);
    }
    return this.ProjectModel;
  }

  async getAllProjects(): Promise<IProject[]> {
    const Project = await this.ensureModel();
    const projects = await Project.find().exec();
    return JSON.parse(JSON.stringify(projects));
  }

  async createProject(data: Partial<IProject>): Promise<IProject> {
    const Project = await this.ensureModel();
    const project = new Project(data);
    const savedProject = await project.save();
    return JSON.parse(JSON.stringify(savedProject.toJSON()));
  }

  async findProjectById(id: string): Promise<IProject | null> {
    const Project = await this.ensureModel();
    return await Project.findById(id).exec();
  }
}
