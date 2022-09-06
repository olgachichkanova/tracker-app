import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Timer from 'tiny-timer';
import { Task } from '../shared/interface';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  timer = new Timer()

  tasks$!: Observable<Task[]>;
  currentTask!: string;

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasks$ = this.tasksService.getTasks()
    this.tasks$.subscribe(tasks => this.currentTask = tasks[0].text)
  }

  start() {
    if(this.timer.status === 'paused') {
      this.timer.resume();
    }
   this.timer.start(1500000)
  }

  pause() {
    if(this.timer.status === 'running') {
      this.timer.pause()
    }
  }

  reset() {
    this.timer.stop()
  }

}
