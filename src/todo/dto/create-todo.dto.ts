import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * DTO for creating a new todo.
 * Used to validate the request body on POST /todos.
 */
export class CreateTodoDto {
  @ApiProperty({
    description: 'The title of the todo',
    example: 'Buy groceries',
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(500, { message: 'Title must be at most 500 characters' })
  title: string;
}
