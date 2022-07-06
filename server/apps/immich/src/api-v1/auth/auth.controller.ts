import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthUserDto, GetAuthUser } from '../../decorators/auth-user.decorator';
import { JwtAuthGuard } from '../../modules/immich-jwt/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginCredentialDto } from './dto/login-credential.dto';
import { LoginResponseDto } from './dto/login-response-dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({
    summary: 'Login',
    description: 'Login operation using email and password',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponseDto
  })
  @ApiResponse({
    status: 400,
    description: 'Login failed'
  })
  async login(@Body(ValidationPipe) loginCredential: LoginCredentialDto): Promise<LoginResponseDto> {
    return await this.authService.login(loginCredential);
  }

  @Post('/admin-sign-up')
  async adminSignUp(@Body(ValidationPipe) signUpCrendential: SignUpDto) {
    return await this.authService.adminSignUp(signUpCrendential);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/validateToken')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateToken(@GetAuthUser() authUser: AuthUserDto) {
    return {
      authStatus: true,
    };
  }
}
