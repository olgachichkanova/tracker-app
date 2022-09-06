import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Task } from '../shared/interface';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  
  form!: FormGroup;
  tasks$!: Observable<Task[]>;
  refreshTasks$ = new BehaviorSubject<boolean>(true);

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      task: new FormControl(null, Validators.required)
    })
    
    this.tasks$ = this.refreshTasks$.pipe(
      switchMap(_ => this.tasksService.getTasks())
    )
  }

  submit() {
    if(this.form.invalid) {
      return
    }

    const task: Task = {
      text: this.form.value.task,
      date: new Date()
    }

    this.tasksService.create(task).subscribe(() => {
      this.form.reset()
      this.refreshTasks$.next(true)
    })
  }

  remove(id: any) {
    this.tasksService.remove(id).subscribe(() => {
      this.refreshTasks$.next(true)
    })
  }
}
