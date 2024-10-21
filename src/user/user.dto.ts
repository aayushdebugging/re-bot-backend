import { IsString, IsEnum } from 'class-validator';

export class UserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(['AGENCY', 'USER'])
  role: string;
}

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
