import { Component } from '@angular/core';
import {interval, TimeInterval} from "rxjs";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  public realSec: number
  public sec: number
  public min: number
  public hour: number
  public timeString: string
  public running: boolean
  public timer: any

  constructor() {
    this.realSec = 0
    this.sec = 0
    this.min = 0
    this.hour = 0
    this.timeString = "00 : 00 : 00"
    this.running = false
    this.start()
  }

  start(): void {
    if(this.running == true)
      return

    this.running = true

    this.timer = setInterval( () => {
      this.realSec++
      this.timeString = this.secToTimeString()
    }, 1000)
  }

  stop(): void {
    clearInterval(this.timer)
    this.running = false
  }

  reset(): void {
    if(this.running == true)
      this.stop()
    this.sec = 0
    this.min = 0
    this.hour = 0
  }

  secToTimeString(): string {
    this.sec = Math.floor((this.realSec) % 60)
    this.min = Math.floor((this.realSec / 60) % 60)
    this.hour = Math.floor((this.realSec / (60 * 60)) % 24)

    return (
      this.hour.toLocaleString("us-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      " : " +
      this.min.toLocaleString("us-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      " : " +
      this.sec.toLocaleString("us-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    )
  }
}
