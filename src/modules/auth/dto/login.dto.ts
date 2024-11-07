import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class LoginDto {
  @ApiProperty({ description: 'login user email' })
  @JoiSchema(Joi.string().required())
  email: string;
  @ApiProperty({ description: 'login user password' })
  @JoiSchema(Joi.string().required())
  password: string;
}
