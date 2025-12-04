import { IsOptional, IsString } from "class-validator";

export class CreateProject {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  createdBy!: string;
}
