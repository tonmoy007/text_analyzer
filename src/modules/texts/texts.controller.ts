import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TextsService } from './texts.service';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TextEntity } from './entities/text.entity';
import { JwtAuthGuard } from '../auth';
import { TextAnalysis } from './utils/text_analysis';
import { TextAnalysisEntity } from './entities/text-analysis.entity';

@Controller('texts')
@ApiTags('Texts')
@ApiBearerAuth()
export class TextsController {
  constructor(private readonly textsService: TextsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new text' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, type: TextEntity })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createTextDto: CreateTextDto) {
    return this.textsService.create(createTextDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all text' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: TextEntity })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.textsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find text by id' })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.textsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update text by id' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTextDto: UpdateTextDto) {
    return this.textsService.update(id, updateTextDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete text by id' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.textsService.remove(id);
  }

  @Get(':id/counts/words')
  @ApiOperation({ summary: 'Find total word in a text' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: TextAnalysisEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async totalWords(@Param('id') id: string) {
    const text = await this.textsService.findOne(id);
    return new TextAnalysisEntity(TextAnalysis.findWords(text.content));
  }

  @Get(':id/counts/sentences')
  @ApiOperation({ summary: 'Find total sentences in a text' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: TextAnalysisEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async countSentence(@Param('id') id: string) {
    const text = await this.textsService.findOne(id);
    return new TextAnalysisEntity(TextAnalysis.findSentences(text.content));
  }

  @Get(':id/counts/characters')
  @ApiOperation({ summary: 'Find total characters in a text' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: TextAnalysisEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async countCharacters(@Param('id') id: string) {
    const text = await this.textsService.findOne(id);
    return new TextAnalysisEntity(TextAnalysis.findChars(text.content));
  }

  @Get(':id/counts/paragraph')
  @ApiOperation({ summary: 'Find total paragraph in a text' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: TextAnalysisEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async countParagraph(@Param('id') id: string) {
    const text = await this.textsService.findOne(id);
    return new TextAnalysisEntity(TextAnalysis.findParagraphs(text.content));
  }

  @Get(':id/longest-words')
  @ApiOperation({ summary: 'Find longest words in a text' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: TextAnalysisEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLongestWords(@Param('id') id: string) {
    const text = await this.textsService.findOne(id);
    return new TextAnalysisEntity(TextAnalysis.findLongestWords(text.content));
  }
}
