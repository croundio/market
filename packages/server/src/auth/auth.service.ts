import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PayloadDto } from './dto/payload.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { RegisterGoogleUserDto } from '../user/dto/register-google-user.dto';
import { LoginSerialize } from './serialize/login.serialize';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async isActive(payload: PayloadDto): Promise<boolean> {
    const { isActive } = await this.userService.findOne({
      where: { id: payload.id },
    });

    return isActive;
  }

  async loginOrRegister(
    googleUser: RegisterGoogleUserDto,
  ): Promise<LoginSerialize> {
    let user: User;
    try {
      user = await this.userService.findOne({
        where: { googleId: googleUser.googleId },
      });
    } catch (e) {
      user = await this.userService.createForGoogle(googleUser);
    }

    const payload: PayloadDto = {
      id: user.id,
      createdAt: Date.now(),
    };

    return {
      id: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }
}
