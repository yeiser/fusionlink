import { UserDto } from "../../domain/dtos/auth/UserDto";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<UserDto>;
}

export class LoginUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<UserDto> {
    return await this.authRepo.login(credentials);
  }
}