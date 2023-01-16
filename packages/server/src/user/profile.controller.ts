import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '../auth/decorator/user.decorator';
import { PayloadDto } from '../auth/dto/payload.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { User as UserEntity } from './user.entity';
import { Serialize } from '../decorator/serialize.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private service: UserService) {}

  @Get()
  @UseGuards(JwtGuard)
  @Serialize(UserEntity)
  @ApiOkResponse({ type: UserEntity })
  getProfile(@User() user: PayloadDto) {
    return this.service.getProfile(user.id);
  }

  @Patch()
  @UseGuards(JwtGuard)
  @Serialize(UserEntity)
  @ApiOkResponse({ type: UserEntity })
  updateProfile(
    @User() user: PayloadDto,
    @Body() dto: UpdateProfileDto,
  ): Promise<UserEntity> {
    return this.service.updateProfile(user.id, dto);
  }
}
