import {Component, Input} from '@angular/core';
import { Tile } from "./Tile"

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input() tile!: Tile
}
