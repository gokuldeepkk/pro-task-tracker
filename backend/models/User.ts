import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsIn } from "class-validator";

export class CreateUserRequest {
  @IsNotEmpty() name!: string;
  @IsNotEmpty() @IsEmail() email!: string;
  @IsNotEmpty() password!: string;
  @IsOptional() @IsInt() age?: number;
  @IsOptional() @IsIn(["user", "admin"]) userPermission?: "user" | "admin";
}
