import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginCredentialDto {
  @IsString()
  @IsNotEmpty() 
  @ApiProperty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password!: string;
}

export class LoginResponseDto {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  constructor(accessToken: string, firstName: string, lastName: string) {
    this.accessToken = accessToken;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // ...
}