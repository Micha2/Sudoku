import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Solvetime } from "./solvetime.interface";
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-highscore-list',
  templateUrl: './highscorelist.component.html',
  styleUrls: ['./highscorelist.component.scss']
})
export class HighscorelistComponent {
  highscores: Solvetime[]
  localTime: String
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTimes()
  }

  async fetchTimes() {
    await this.http.get<Solvetime[]>("http://localhost:3000/api/solvetime").subscribe({
      next: (solvetimes: Solvetime[]) => {
        this.highscores = solvetimes
        this.highscores.forEach( (highscore) => {
          highscore.localTime = formatDate(highscore.createDate, "dd.MM.YYYY hh:mm", "de-DE")
        })
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
