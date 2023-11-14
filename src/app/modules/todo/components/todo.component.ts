import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../../shared/types';
import { EFilterAspect } from '../../shared/enums';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  constructor(private readonly todoService: TodoService) {}

  todos: ITodo[] = [];
  selectedFilter: string = EFilterAspect.ALL;
  filterOptions: string[] = Object.values(EFilterAspect);
  selectedTodo: ITodo | null = null;
  isEditingForm: boolean = false;

  ngOnInit(): void {
    this.todoService.getTodosObservable().subscribe((todos) => {
      this.todos = todos;
    });
  }

  addTodo(title: string, description?: string) {
    this.todoService.addTodo(title, description);
  }

  toggleTodoById(id: number) {
    this.todoService.toggleTodoById(id);
  }

  deleteTodoById(id: number) {
    this.todoService.deleteTodoById(id);
  }

  updateTodoById(
    id: number,
    title: string,
    description?: string,
    completed?: boolean
  ) {
    console.log(id, title, description, completed);
    this.todoService.updateTodoById(id, title, description, completed);
    this.toggleFormType();
  }

  filterTodos() {
    switch (this.selectedFilter) {
      case EFilterAspect.COMPLETED:
        this.todoService.filterTodos(true);
        break;
      case EFilterAspect.INCOMPLETED:
        this.todoService.filterTodos(false);
        break;
      default:
        this.todoService.getAllTodos();
        break;
    }
  }

  toggleFormType(editForm?: boolean) {
    if (editForm) {
      this.isEditingForm = true;
    } else {
      this.isEditingForm = false;
    }
  }

  selectTodoForEdit(todo: ITodo) {
    this.selectedTodo = todo;
    this.toggleFormType(true);
  }
}
