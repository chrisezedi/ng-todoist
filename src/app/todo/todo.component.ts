import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Todo } from '../types/todo.interface';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() task!:Todo;

  updateMode:boolean = false;
  taskForm = new FormGroup({
    name:new FormControl('',Validators.required),
    complete:new FormControl('',Validators.required)
  })
  constructor(private todoService:TodoService) {}

  ngOnInit(): void {
    this.taskForm.setValue({name:this.task.task,complete:this.task.complete})
  }

  complete(event:any){
    this.todoService.completeTask(this.task);
  }

  toggleUpdate(){
    this.updateMode = !this.updateMode;
  }

  save(){
    this.updateMode = false;
    this.task.task = this.taskForm.controls.name.value;
    this.todoService.updateTask(this.task);
  }

  removeTodo(){
    this.todoService.deleteTask(this.task)
  }

}
