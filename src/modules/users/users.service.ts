import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../common';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  public constructor(private readonly prismService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prismService.user.create({ data: createUserDto });
  }

  async findAll() {
    return this.prismService.user.findMany({});
  }

  findOne(id: string) {
    return this.prismService.user.findFirstOrThrow({ where: { id } });
  }

  validate(email: string, password: string) {
    return this.prismService.user.findUnique({
      where: {
        email: email,
        password: password,
      }
    });
  }

  update(id: string, updateUserData: UpdateUserDto) {
    return this.prismService.user.update({
      where: { id },
      data: updateUserData,
    });
  }

  remove(id: string) {
    return this.prismService.user.delete({ where: { id } });
  }

  async getByEmail(email: string) {
    return this.prismService.user.findUnique({ where: { email } });
  }
}
