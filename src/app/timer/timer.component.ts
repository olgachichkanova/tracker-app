import { Component, OnInit } from '@angular/core';
import Timer from 'tiny-timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  timer = new Timer()

  constructor() { }

  ngOnInit(): void {
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
