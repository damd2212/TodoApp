import { TodoService } from './../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Task } from '../tasklist/task';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.page.html',
  styleUrls: ['./tasklist.page.scss'],
})
export class TasklistPage implements OnInit {
  tasks: Array<Task> = [];
  private path = 'Tareas/'

  data:Task ={
    title:'',
    status:'',
    id:''
  }

  constructor(public todoService:TodoService) {
    /* this.tasks = [
      {title: 'Milk', status: 'open',id:'001'},
      {title: 'Eggs', status: 'open',id:'002'},
      {title: 'Syrup', status: 'open',id:'003'},
      {title: 'Pancake Mix', status: 'open',id:'004'}
    ]; */
  }

  ngOnInit() {
    this.getTareas()
  }

  addItem() {
    let theNewTask: string|null = prompt("New Task");

    if (theNewTask) {
      //this.tasks.push({ title: theNewTask, status: 'open' });
    }else{
      console.log("presiona cancel");
    }

    /* if (theNewTask !== '' || theNewTask !== null ) {
      this.tasks.push({ title: theNewTask, status: 'open' });
    } */
  }

  markAsDone(slidingItem: IonItemSliding, task: Task) {
    task.status = "done";
    this.todoService.updateDoc(task,this.path,task.id)
    setTimeout(() => { slidingItem.close(); }, 1);
  }

  removeTask(slidingItem: IonItemSliding, task: Task) {
    task.status = "removed";
    let index = this.tasks.indexOf(task);
    if (index > -1) {
        //Removes the task from the array at a specific position
        this.tasks.splice(index, 1);
    }
  }

  guardarTarea(){

    let theNewTask: string|null = prompt("New Task");


    const task:Task = new Task()

    if (theNewTask) {
      //this.tasks.push({ title: theNewTask, status: 'open' });
      /* const data = {
        title:theNewTask,
        status:'open'
      } */

      this.data.title = theNewTask
      this.data.status = 'open'
      this.data.id = this.todoService.getId()
      this.todoService.createDoc(this.data,this.path,this.data.id);
    }else{
      console.log("presiona cancel");
    }

  }

  getTareas(){
    this.todoService.getCollection<Task>(this.path).subscribe(res =>{
      console.log(res);
      this.tasks = res

    })
  }

  eliminarTarea(slidingItem: IonItemSliding, task: Task){
    this.todoService.deleteDoc(this.path,task.id)
  }

}
