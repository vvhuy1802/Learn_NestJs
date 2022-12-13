import { Controller, Get, Post, Body } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos') //localhost:3000/todos
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get('all') //localhost:3000/todos/all
  getAllTodos() {
    return this.todosService.getAllTodos();
  }

  @Post('create') //localhost:3000/todos/create
  createTodo(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    return this.todosService.createTodo(title, description);
  }
}
