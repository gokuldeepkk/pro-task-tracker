import { ProjectService } from "@services/projectService";
import {
  Body,
  Controller,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
} from "routing-controllers";
import { CreateProject } from "src/dto/Project.dto";
import { BASE_ROUTES, MODULES } from "src/utils/constants/routes";
import { ResponseUtil } from "src/utils/responseUtil";
import { Service } from "typedi";

@Service()
@Controller(BASE_ROUTES.secure + MODULES.projects)
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private responseUtil: ResponseUtil
  ) {}

  @Post("/")
  async createProject(@Body({ required: true }) projectData: CreateProject) {
    try {
      return await this.projectService.createProject(projectData);
    } catch (error) {
      return this.responseUtil.error(error);
    }
  }

  @Get("/")
  async getAllProjects() {
    try {
      const projects = await this.projectService.getAllProjects();
      return projects;
    } catch (error) {
      return this.responseUtil.error(error);
    }
  }

  @Get("/:id")
  async getProjectById(@Param("id") id: string) {
    try {
      return await this.projectService.getProjectById(id);
    } catch (error) {
      return this.responseUtil.error(error);
    }
  }

  @Delete("/:id")
  async deleteProject(@Param("id") id: string) {
    try {
      return await this.projectService.deleteProject(id);
    } catch (error) {
      return this.responseUtil.error(error);
    }
  }
}
