import {Component, OnInit} from '@angular/core';
import {Tile} from "./Tile";
import {range} from "../../range";
import {TimerComponent} from "../timer/timer.component";

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
    // console.log(this.timer.realSec)
  }

  ngOnInit() {
    this.loadSudoku().then( () => {
      this.selectedTile = this.board[0][0]
      this.selectedTileLocation = [0, 0]
    }
  )

  }

  // loadSudoku() {
  //     const sudokusJsonUrl: RequestInfo = "../../../assets/Sudokus.json"
  //     return fetch(sudokusJsonUrl)
  //       .then(response => response.json())
  //       .then(boardData => {
  //         this.board = boardData.map((row: any[]) => row.map(tileData => new Tile(tileData.value ? parseInt(tileData.value) : undefined)));
  //       })
  //       .catch(error => {
  //         console.error(`Fehler beim Laden der JSON-Datei ${sudokusJsonUrl}:`, error);
  //       });
  // }

  loadSudoku() {
    const sudokuApiUrl: string = "https://sudoku-api.vercel.app/api/dosuku";
    return fetch(sudokuApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Fehler beim Laden der Sudoku-API: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        const grid = data.newboard.grids[0].value;
        this.board = grid.map((row: number[]) =>
          row.map(value => new Tile(value !== 0 ? value : undefined))
        );
      })
      .catch(error => {
        console.error(`Fehler beim Laden des Sudokus von der API ${sudokuApiUrl}:`, error);
      });
  }


  setCurrentTileWithLocation(tile: Tile, location: [number, number]) {
    this.selectedTile = tile
    this.selectedTileLocation = location
  }

  print() {
    console.log(JSON.stringify(this.board))
  }

  // sendTime() {
  //   this.timer.
  // }

  resetSudoku() {
    this.loadSudoku()
  }

  solveSudoku(): Boolean {
    // Finde das nächste leere Feld
    const nextEmpty = this.findNextEmpty()
    if(!nextEmpty) {
      // Alle Felder sind gefüllt, Sudoku ist gelöst
      return true
    }

    // Probiere alle möglichen Zahlen für das leere Feld aus
    for(let i = 1; i <= 9; i++) {
      if(this.numberPossible(i, nextEmpty[0], nextEmpty[1])) {
        // Setze die Zahl und versuche, das Sudoku rekursiv weiterzulösen
        this.board[nextEmpty[0]][nextEmpty[1]].value = i
        if(this.solveSudoku()) {
          // Sudoku wurde gelöst
          return true
        }
        // Wenn das Sudoku nicht gelöst wurde, setze das Feld zurück und versuche eine andere Zahl
        this.board[nextEmpty[0]][nextEmpty[1]].value = undefined
      }
    }

    // Keine der möglichen Zahlen funktioniert, Sudoku ist unlösbar
    return false
  }

  findNextEmpty(): [number, number] | null {
    for(let i = 0; i < 9; i++) {
      for(let j = 0; j < 9; j++) {
        if(this.board[i][j].value == undefined) {
          // Leeres Feld gefunden
          return [i, j]
        }
      }
    }
    // Kein leeres Feld gefunden
    return null
  }

  solve(row: number = 0, col: number = 0) {
    if(row == 9) {
      return
    }

    if(this.board[row][col].value == undefined) {
      for(let i of range(1, 9)) {
        if(this.numberPossible(i, row, col)) {
          this.board[row][col].value = i
          switch(col) {
            case 8: {
              this.solve(row + 1, 0)
              break
            }
            default: {
              this.solve(row, col + 1)
            }
          }
          this.board[row][col].value = undefined
        }
      }
    } else {
      switch(col) {
        case 8: {
          this.solve(row + 1, 0)
          break
        }
        default: {
          this.solve(row, col + 1)
        }
      }
    }
  }

  solveAlternative() {
    this.board.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        if(tile.value == undefined) {
          console.log("currently working on: [" + rowIndex + "][" + tileIndex + "]")
          for(let i of range(1, 9)) {
            if(this.numberPossible(i, rowIndex, tileIndex)) {
              this.board[rowIndex][tileIndex].value = i
              this.solveAlternative()
              this.board[rowIndex][tileIndex].value = undefined
            }
          }
          return
        }
      })
    })
  }

  private numberPossible(nr: number, row: number, column: number): Boolean {
    const nrBuffer = this.board[row][column].value
    this.board[row][column].value = nr

    if(!this.checkRow(nr, row) || !this.checkColumn(nr, column) || !this.checkSquare(nr, this.getSquare(row, column))) {
      this.board[row][column].value = nrBuffer
      return false
    }
    this.board[row][column].value = nrBuffer
    return true
  }

  private getSquare(row: number, column: number): [[number, number], [number, number]] | undefined {
    if(range(0, 2).includes(row) && range(0, 2).includes(column))
      return [[0, 2], [0, 2]]

    if(range(3, 5).includes(row) && range(0, 2).includes(column))
      return [[3, 5], [0, 2]]

    if(range(6, 8).includes(row) && range(0, 2).includes(column))
      return [[6, 8], [0, 2]]

    if(range(0, 2).includes(row) && range(3, 5).includes(column))
      return [[0, 2], [3, 5]]

    if(range(3, 5).includes(row) && range(3, 5).includes(column))
      return [[3, 5], [3, 5]]

    if(range(6, 8).includes(row) && range(3, 5).includes(column))
      return [[6, 8], [3, 5]]

    if(range(0, 2).includes(row) && range(6, 8).includes(column))
      return [[0, 2], [6, 8]]

    if(range(3, 5).includes(row) && range(6, 8).includes(column))
      return [[3, 5], [6, 8]]

    if(range(6, 8).includes(row) && range(6, 8).includes(column))
      return [[6, 8], [6, 8]]

    return undefined
  }

  private checkRow(checkNr: number, rowIndex: number): Boolean {
    let counter = 0
    const row = this.board[rowIndex]
    for(let tile of row) {
      if(checkNr == tile.value) {
        counter++
        if(counter > 1)
          return false
      }
    }
    return true
  }

  private checkColumn(checkNr: number, columnIndex: number): Boolean {
    let counter = 0
    for(let row of this.board) {
      if(checkNr == row[columnIndex].value) {
        counter++
        if(counter > 1)
          return false
      }
    }
    return true
  }

  private checkSquare(checkNr: number, square: [[number, number], [number, number]] | undefined): Boolean {
    if(!square)
      return false
    let counter = 0
    for(let i = square[0][0]; i <= square[0][1]; i++)
      for(let k = square[1][0]; k <= square[1][1]; k++)
        if(checkNr == this.board[i][k].value) {
          counter++
          if(counter > 1)
            return false
        }
    return true
  }
}
