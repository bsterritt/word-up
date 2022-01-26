import { Component, OnInit, Input } from '@angular/core';
import { Tile } from "./tile";

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.sass']
})
export class TileComponent implements OnInit {

  constructor() { }

  @Input() colour = 'grey';
  @Input() tile: Tile = new Tile("","");

  handleButtonClick(): void  {
    console.log("TileComponent button click");
  }

  ngOnInit(): void {
  }

}


