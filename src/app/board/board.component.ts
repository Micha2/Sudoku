import { Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  completed!: boolean
  tiles!: Array<number>
  selectedTile!: number
  constructor() { }

  ngOnInit() {
    this.completed = false
    this.tiles = Array(81).fill(0)
    this.selectedTile = 0
  }
}
