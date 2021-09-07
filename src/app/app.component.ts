import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TodoService } from './services/todo.service';
import { Todo } from './types/todo.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'NG-todoist';
  todos$:Observable<Todo[]>;
  todoForm = new FormGroup({
    task:new FormControl('',Validators.required)
  });

  constructor(private todoService:TodoService){
    this.todos$ = this.todoService.todos$;
  }

  add(){
    let task = this.todoForm.controls.task.value;
    this.todoService.addTodoItem(task);
    this.todoForm.reset();
  }

  clearTodos(){
    this.todoService.clearTodos();
  }
}
