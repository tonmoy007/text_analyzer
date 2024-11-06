import { Injectable } from '@nestjs/common';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { PrismaService } from '../common';

@Injectable()
export class TextsService{
  public constructor(private readonly prismService: PrismaService) {
  }

  async create(createTextDto: CreateTextDto) {
    return this.prismService.text.create({ data: createTextDto });
  }

  async findAll() {
    return this.prismService.text.findMany({});
  }

  findOne(id: string) {
    return this.prismService.text.findFirstOrThrow({ where: { id } });
  }

  update(id: string, updateTextDto: UpdateTextDto) {
    return this.prismService.text.update({
      where: { id },
      data: updateTextDto,
    });
  }

  remove(id: string) {
    return this.prismService.text.delete({ where: { id } });
  }
}
