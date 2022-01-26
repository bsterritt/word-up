import { Component, OnInit } from '@angular/core';
import { Tile } from '../tile/tile';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {

  constructor() { }

  defaultColor: string = "grey";
  wordLength: number = 5;
  turnLength: number = 6;
  currentTurn: number = 0;

  turns = new Array(this.turnLength);

  
  onKeyClick(k: String): void {
    console.log(`onKeyClick on key click : ${k}`);

    let activeTurn = this.turns[this.currentTurn];
    let emptyTileIndex = -1;

    // find first tile that is empty
    let firstEmptyTile = activeTurn.find((tile: Tile, idx : number) => { 
      // save the index
      if (tile.value == "") {
        emptyTileIndex = idx;
        return true;
      }
      return false;
    });

    console.log(`first empty  tile is # ${emptyTileIndex}`);

    // handle backspace
    if ( k == "BACK") {
      
      if (emptyTileIndex > 0) {
        console.log(`emptying tile # ${emptyTileIndex - 1}`);
        activeTurn[emptyTileIndex - 1].value = "";
      
      } else if (emptyTileIndex == -1) {
        console.log(`emptying tile # ${this.wordLength -1}`);
        activeTurn[this.wordLength -1].value = "";
      
        // do nothing if first tile is empty
      } else {
        console.log('backspaced on empty turn');
      }
    // handle enter
    } else if ( k == "ENTER" ) {
      // tiles are full, go to next turn
      if (emptyTileIndex ==  -1) {

        // turns are over
        if (this.currentTurn == this.turnLength -1) {
          alert('Game Over!');
        } else {
          this.currentTurn++;
        }
        
      } else {
        console.warn('word is not finished')
      }
    // handle letter
    } else {
      
      if (firstEmptyTile != null) {
        console.log(' board component onKeyClick updating tile with ' + k);
        firstEmptyTile.value = k;
      } else {
        console.log(' board component onKeyClick all tiles filled');
      }
    }
  }


  ngOnInit(): void {

    this.onKeyClick.bind(this);

    // poopulate the runs with empty tiles
    for (var j = 0; j <  this.turnLength; j++) {
      let turn: Tile[] = [];
      for (var i = 0; i <  this.wordLength; i++) {
        turn.push(new Tile(this.defaultColor,  ""));
      }
      
      this.turns[j] = turn;
    }




  }
  
}

