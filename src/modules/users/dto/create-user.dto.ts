import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ description: 'Email of the user' }) readonly email: string;
  @ApiProperty({ description: 'Password' }) readonly password: string;

  public constructor(data: User) {
    this.email = data.email;
    this.password = data.password;
  }
}
