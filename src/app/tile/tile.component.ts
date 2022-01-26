import { Component, OnInit, Input } from '@angular/core';
import { Tile } from "./tile";
import { LetterStateService } from '../letter-state.service';


@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.sass']
})
export class TileComponent implements OnInit {

  constructor(private letterStates: LetterStateService) { }

  @Input() tile!: Tile;

  getTileColour(tile: Tile) {
    return this.letterStates.getColourForState(tile.state);
  }

  ngOnInit(): void {
  }

}


