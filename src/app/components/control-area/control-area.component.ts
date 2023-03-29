import {Component, OnInit} from '@angular/core';
import {BoardComponent} from "../board/board.component";
import {range} from "../../Range"

@Component({
  selector: 'app-control-area',
  templateUrl: './control-area.component.html',
  styleUrls: ['./control-area.component.scss']
})
export class ControlAreaComponent implements OnInit {
  values!: Array<number>

  constructor(private board: BoardComponent) {
  }

  ngOnInit() {
    this.values = Array(9)
    for(let i = 1; i <= 9; i++)
      this.values[i - 1] = i
  }

  changeBoardValue(newVal: number) {
    // this.numberPossible(newVal, this.board.selectedTileLocation[0], this.board.selectedTileLocation[1])
    this.board.selectedTile.value = newVal
  }

  solve(row: number = 0, col: number = 0) {
    if(row == 9) {
      return
    }

    if(this.board.board[row][col].value == 0) {
      for(let i of range(1, 9)) {
        if(this.numberPossible(i, row, col)) {
          this.board.board[row][col].value = i
          switch(col) {
            case 8: {
              this.solve(row + 1, 0)
              break
            }
            default: {
              this.solve(row, col + 1)
            }
          }
          this.board.board[row][col].value = 0
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
    this.board.board.forEach((row, rowI) => {
      row.forEach((column, columnI) => {
        if(this.board.board[rowI][columnI].value == 0) {
          for(let i of range(1, 9)) {
            if(this.numberPossible(i, rowI, columnI)) {
              this.board.board[rowI][columnI].value = i
              this.solveAlternative()
              this.board.board[rowI][columnI].value = 0
            }
          }
          return
        }
      })
    })
    alert("Finished")
  }

  private numberPossible(nr: number, row: number, column: number): Boolean {
    const nrBuffer = this.board.board[row][column].value
    this.board.board[row][column].value = nr

    if(!this.checkRow(nr, row) || !this.checkColumn(nr, column) || !this.checkSquare(nr, this.getSquare(row, column))) {
      this.board.board[row][column].value = nrBuffer
      return false
    }
    this.board.board[row][column].value = nrBuffer
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
    const row = this.board.board[rowIndex]
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
    for(let row of this.board.board) {
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
        if(checkNr == this.board.board[i][k].value) {
          counter++
          if(counter > 1)
            return false
        }
    return true
  }
}
