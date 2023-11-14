import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../../adapters/local-storage.adapter';
import { ITodo } from '../../shared/types';
import { TO_DO_DB_KEY } from '../../shared/constant';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TodoService {
  private todosSubject = new BehaviorSubject<ITodo[]>([]);

  constructor(private repo: LocalStorageService) {
    const initialTodos = this.getTodos();
    this.todosSubject.next(initialTodos);
  }

  getTodosObservable(): Observable<ITodo[]> {
    return this.todosSubject.asObservable();
  }

  getAllTodos(): ITodo[] {
    const todos = this.getTodos();
    this.todosSubject.next(todos);
    return todos;
  }

  filterTodos(completed: boolean): ITodo[] {
    const todos = this.getTodos();
    const result = todos.filter((todo) => todo.completed === completed);
    this.todosSubject.next(result);
    return result;
  }

  resetTodos(): void {
    this.repo.remove(TO_DO_DB_KEY.TODOS);
    this.todosSubject.next([]);
  }

  toggleTodoById(id: number): ITodo | null {
    const todos = this.getTodos();
    let updatedTodo: ITodo | null = null;
    todos.forEach((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        updatedTodo = todo;
      }
    });
    this.repo.set(TO_DO_DB_KEY.TODOS, JSON.stringify(todos));
    this.todosSubject.next(todos);
    return updatedTodo;
  }

  updateTodoById(
    id: number,
    title: string,
    description?: string,
    completed?: boolean
  ): ITodo | null {
    const todos = this.getTodos();
    let updatedTodo: ITodo | null = null;
    todos.forEach((todo) => {
      if (todo.id === id) {
        todo.title = title;
        if (completed) todo.completed = completed;
        if (description) todo.description = description;
        updatedTodo = todo;
      }
    });
    this.repo.set(TO_DO_DB_KEY.TODOS, JSON.stringify(todos));
    this.todosSubject.next(todos);
    return updatedTodo;
  }

  addTodo(title: string, description?: string): ITodo {
    const todos = this.getTodos();
    const todoToAdd = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    todos.push(todoToAdd);
    this.repo.set(TO_DO_DB_KEY.TODOS, JSON.stringify(todos));
    this.todosSubject.next(todos);
    return todoToAdd;
  }

  deleteTodoById(id: number): void {
    const todos = this.getTodos();
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    this.repo.set(TO_DO_DB_KEY.TODOS, JSON.stringify(filteredTodos));
    this.todosSubject.next(filteredTodos);
  }

  private getTodos(): ITodo[] {
    const todos = this.repo.get(TO_DO_DB_KEY.TODOS);
    return todos ? JSON.parse(todos) : [];
  }
}
