import { ApiProperty } from '@nestjs/swagger';

export class TextAnalysisEntity {
  @ApiProperty({ description: 'Value of the output' })
  value: number;

  constructor(value: number) {
    this.value = value;
  }
}
