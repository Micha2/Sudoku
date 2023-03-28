import { Component, OnInit } from '@angular/core';
import { BoardComponent } from "../board.component";

@Component({
  selector: 'app-control-area',
  templateUrl: './control-area.component.html',
  styleUrls: ['./control-area.component.scss']
})
export class ControlAreaComponent implements OnInit{
  values!: Array<number>
  constructor(private board: BoardComponent) {
  }

  ngOnInit() {
    this.values = Array(9)
    for(let i = 1; i <= 9; i++)
      this.values[i-1] = i
  }

  changeBoardValue(newVal: number) {
    this.board.tiles[this.board.selectedTile] = newVal
  }
}
