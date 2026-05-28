import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoInput } from './graphql/create-todo.input';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find({ order: { created_at: 'DESC' } });
  }

  async create(createTodoInput: CreateTodoInput): Promise<Todo> {
    const newTodo = this.todoRepository.create(createTodoInput);
    return this.todoRepository.save(newTodo);
  }

  async update(id: string, is_done: boolean): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.is_done = is_done;
    return this.todoRepository.save(todo);
  }

  async delete(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new Error('Todo not found');
    }
    await this.todoRepository.remove(todo);
    // Return the deleted todo for the GraphQL response
    return { ...todo, id };
  }
}
