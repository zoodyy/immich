import { ApiProperty } from "@nestjs/swagger";

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