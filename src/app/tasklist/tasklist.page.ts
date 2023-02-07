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

  }

  ngOnInit() {
    this.getTareas()
  }


  markAs(slidingItem: IonItemSliding, task: Task) {
    if (task.status==='open') {
      task.status = "done";
    } else {
      task.status = "open";
    }
    this.todoService.updateDoc(task,this.path,task.id)
    setTimeout(() => { slidingItem.close(); }, 1);
  }


  guardarTarea(){

    let theNewTask: string|null = prompt("New Task");


    const task:Task = new Task()

    if (theNewTask) {

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
