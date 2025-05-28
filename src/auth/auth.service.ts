/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { User } from './users/entities/user.entity';
import { UsersService } from './users/users.service';
import { UserPayload, UserToken } from './models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      typeToken: 'Bearer',
    };
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email, true);

    const isPasswordValid = user?.password
      ? compareSync(pass, user.password)
      : false;

    if (isPasswordValid) {
      delete user?.password; // Remove password from the response
      return user;
    }

    return null;
  }
}
