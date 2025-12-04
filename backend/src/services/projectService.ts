import { ProjectRepository } from "src/repositories/projectRepository";
import { ResponseUtil } from "src/utils/responseUtil";
import Container, { Service } from "typedi";

@Service()
export class ProjectService {
  constructor(
    private projectRepository: ProjectRepository,
    private responseUtil: ResponseUtil
  ) {
    projectRepository = Container.get(ProjectRepository);
    responseUtil = Container.get(ResponseUtil);
  }

  async createProject(projectData: any) {
    try {
      const project = await this.projectRepository.createProject(projectData);
      return this.responseUtil.success(project);
    } catch (error) {
      return this.responseUtil.error("Error creating project");
    }
  }

  async getAllProjects() {
    try {
      const projects = await this.projectRepository.getAllProjects();
      return this.responseUtil.success(projects);
    } catch (error) {
      return this.responseUtil.error("Error fetching projects");
    }
  }

  async getProjectById(id: string) {
    try {
      const project = await this.projectRepository.findProjectById(id);
      if (!project) {
        return this.responseUtil.error("Project not found");
      }
      return this.responseUtil.success(project);
    } catch (error) {
      return this.responseUtil.error("Error fetching project");
    }
  }
}
