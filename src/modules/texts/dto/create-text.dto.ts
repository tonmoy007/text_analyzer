import { ApiProperty } from '@nestjs/swagger';
import { Text } from '@prisma/client';

export class CreateTextDto {
  @ApiProperty({ description: 'Text Content', example: 'Any Text Content ...' })
  readonly content: string;
  public constructor(entity: Text) {
    this.content = entity.content;
  }
}
