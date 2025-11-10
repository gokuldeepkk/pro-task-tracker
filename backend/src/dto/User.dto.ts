import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsIn,
  IsString,
} from "class-validator";

export class CreateUserRequest {
  @IsNotEmpty() name!: string;
  @IsNotEmpty() @IsEmail() email!: string;
  @IsNotEmpty() password!: string;
  @IsOptional() @IsIn(["user", "admin"]) userPermission?: "user" | "admin";
}

export class LoginRequest {
  @IsNotEmpty() @IsEmail() email!: string;
  @IsNotEmpty() @IsString() password!: string;
}
