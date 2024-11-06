import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class LoginDto {
  @ApiProperty({ description: 'login user email' })
  @JoiSchema(Joi.string().required())
  email: string;
  @ApiProperty({ description: 'login user password' })
  @JoiSchema(Joi.string().required())
  password: string;
}
