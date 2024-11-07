import { Test, TestingModule } from '@nestjs/testing';
import { TextsController } from './texts.controller';
import { TextsService } from './texts.service';
import { PrismaService } from '../common';

describe('TextsController', () => {
  let controller: TextsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextsController],
      providers: [TextsService, PrismaService],
    }).compile();

    controller = module.get<TextsController>(TextsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
