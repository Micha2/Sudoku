import {Component, OnInit} from '@angular/core';
import {Tile} from "../tile/Tile";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  completed!: boolean
  board!: Tile[][]
  selectedTile!: Tile
  selectedTileLocation!: [number, number]

  constructor() {
  }

  ngOnInit() {
    this.completed = false
    this.board = []
    for(let i = 0; i < 9; i++) {
      this.board[i] = new Array(9)
      for(let k = 0; k < 9; k++) {
        this.board[i][k] = new Tile()
      }
    }
    this.selectedTile = this.board[0][0]
    this.selectedTileLocation = [0, 0]
  }

  setCurrentTileWithLocation(tile: Tile, location: [number, number]) {
    this.selectedTile = tile
    this.selectedTileLocation = location
  }
}
