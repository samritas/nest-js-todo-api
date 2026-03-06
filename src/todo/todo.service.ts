import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateTodoDto } from './dto/create-todo.dto';

export const SUPABASE_CLIENT = 'SUPABASE_CLIENT';

/** Shape of a todo row from the database */
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
}

@Injectable()
export class TodoService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  private get todos() {
    return this.supabase.from('todos');
  }

  /**
   * Fetches all todos from the database, ordered by created_at descending.
   */
  async findAll(): Promise<Todo[]> {
    const { data, error } = await this.todos
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch todos: ${error.message}`);
    }

    return data ?? [];
  }

  /**
   * Creates a new todo with the given title.
   */
  async create(dto: CreateTodoDto): Promise<Todo> {
    const { data, error } = await this.todos
      .insert({ title: dto.title })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create todo: ${error.message}`);
    }

    return data;
  }

  /**
   * Deletes a todo by id. Returns true if deleted, false if not found.
   */
  async remove(id: string): Promise<{ deleted: boolean }> {
    const { data, error } = await this.todos.delete().eq('id', id).select();

    if (error) {
      throw new Error(`Failed to delete todo: ${error.message}`);
    }

    return { deleted: (data?.length ?? 0) > 0 };
  }
}
