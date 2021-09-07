import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../types/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly _todoDataSource = new BehaviorSubject<Todo[]>([]);

  readonly todos$ = this._todoDataSource.asObservable();

  constructor(){
    let todos = localStorage.getItem('todos')
    if(todos){
      todos = JSON.parse(todos)
      this.initTodos(<Todo[]><unknown>todos);
    }
  }

  initTodos(todos:Todo[]):void{
    this._setTodos(todos);
  }

  getTodos():Todo[]{
    return this._todoDataSource.getValue();
  }

  private _setTodos(todos:Todo[]):void{
    this._todoDataSource.next(todos);
    this._initTodosInLocalStorage(todos);
  }

  private _initTodosInLocalStorage(todos:Todo[]):void{
    localStorage.setItem('todos',JSON.stringify(todos));
  }

  addTodoItem(todoTask:string):void{
    const todoTaskId = Math.random().toString(16);
    let newTodo = {id:todoTaskId,task:todoTask,complete:false}
    let todos = [...this.getTodos(),newTodo];
    this._setTodos(todos);
  }

  completeTask(task:Todo):void{
    task.complete ? task.complete = false : task.complete = true;
    let todos = this.getTodos().map(todo =>(todo.id === task.id ? {...todo, complete:task.complete} : todo));

    //move completed task to the bottom
    let indexOfTask = todos.findIndex(todo => todo.complete === true);
    todos.push(todos.splice(indexOfTask,1)[0]);
    this._setTodos(todos);
  }

  updateTask(task:Todo):void{
    let todos = this.getTodos().map(todo =>(todo.id === task.id ? {...todo, task:task.task} : todo));
    this._setTodos(todos);
  }

  deleteTask(task:Todo){
    let todos = this.getTodos().filter(todo => todo.id !== task.id);
    this._setTodos(todos);
  }

  clearTodos(){
    this._setTodos([]);
  }
}
