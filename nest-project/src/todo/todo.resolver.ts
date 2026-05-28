import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { TodoType } from './graphql/todo.type';
import { CreateTodoInput } from './graphql/create-todo.input';

@Resolver(() => TodoType)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [TodoType])
  async todos() {
    return this.todoService.findAll();
  }

  @Mutation(() => TodoType)
  async addTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => TodoType)
  async toggleTodo(
    @Args('id') id: string,
    @Args('is_done') is_done: boolean,
  ) {
    return this.todoService.update(id, is_done);
  }

  @Mutation(() => TodoType)
  async deleteTodo(@Args('id') id: string) {
    return this.todoService.delete(id);
  }
}
