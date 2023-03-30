import {Component, Input} from '@angular/core';
import { Tile } from "./Tile"

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input() tile!: Tile

  setTile(newVal: any) {
    let valAsNr = parseInt(newVal)

    if(isNaN(valAsNr))
      this.tile.value = undefined
    else
      this.tile.value = valAsNr
  }
}
