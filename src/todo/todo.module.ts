import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService, SUPABASE_CLIENT } from './todo.service';
import { createSupabaseClient } from '../config/supabase.client';

@Module({
  controllers: [TodoController],
  providers: [
    TodoService,
    {
      provide: SUPABASE_CLIENT,
      useFactory: () => createSupabaseClient(),
    },
  ],
})
export class TodoModule {}
