import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todos.model';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  getAllTodos() {
    if (this.todos.length === 0) return { message: 'No todos found' };
    return [...this.todos];
  }

  createTodo(title: string, description: string) {
    const newTodo = new Todo(
      Math.random().toString(),
      title,
      description,
      false,
    );
    this.todos.push(newTodo);
    return newTodo;
  }
}
