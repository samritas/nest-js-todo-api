import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TodoService, Todo } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'Returns the list of all todos.' })
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a todo' })
  @ApiResponse({ status: 201, description: 'The todo has been created.' })
  @ApiResponse({ status: 400, description: 'Invalid request body.' })
  async create(@Body() dto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a todo by id' })
  @ApiResponse({ status: 200, description: 'Returns whether the todo was deleted.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ deleted: boolean }> {
    return this.todoService.remove(id);
  }
}
