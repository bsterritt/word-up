import { Component, OnInit } from '@angular/core';
import { Tile } from '../tile/tile';
import { GameHistoryService } from '../game-history.service';
import { WordCheckerService } from '../word-checker.service';
import { LetterStateService } from '../letter-state.service';
import { GameStateService } from '../game-state.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {

  constructor(
    private gameHistory : GameHistoryService, 
    private letterStates: LetterStateService,
    private gameState: GameStateService
  ) 
  { 

  }

 // turns = new Array(this.gameState.turnLength);
  turns: any;

  // gameInfo 
  wins!: number;
  losses!: number;
  winRate!: number;
  winStreak!: number;
  bestWinStreak!: number;
  guessDistribution: number[] = [];

  private updateGameHistory():void {
    this.wins = this.gameHistory.getWinTotal();
    this.losses = this.gameHistory.getLossTotal();
    this.winRate = this.gameHistory.getWinRate();    
    this.winStreak = this.gameHistory.getWinStreak();
    this.bestWinStreak = this.gameHistory.getBestWinStreak();

    for (var i = 1; i <= this.gameState.turnLength; i++) {
      this.guessDistribution.push(this.gameHistory.getGuessCountInstances(i));
    }
  }

  onKeyClick(k: String): void {
    console.log(`onKeyClick on key click : ${k}`);

    if (!this.gameState.isPlaying()) {
      console.log(`onKeyClick, game not ready :`);
      return;
    }

    let activeTurn = this.turns[this.gameState.currentTurn];
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
    if ( k == this.letterStates.BACK) {
      
      if (emptyTileIndex > 0) {
        console.log(`emptying tile # ${emptyTileIndex - 1}`);
        activeTurn[emptyTileIndex - 1].value = "";
      
      } else if (emptyTileIndex == -1) {
        console.log(`emptying tile # ${this.gameState.wordLength -1}`);
        activeTurn[this.gameState.wordLength -1].value = "";
      
        // do nothing if first tile is empty
      } else {
        console.log('backspaced on empty turn');
      }
    // handle enter
    } else if ( k == this.letterStates.ENTER ) {
      // tiles are full, go to next turn
      if (emptyTileIndex ==  -1) {
        this.gameState.goToNextTurn( activeTurn ); 
      } else {
        console.warn('word is not finished')
      }
    // handle letter
    } else {
      
      // empty space on this turn, add the letter there
      if (firstEmptyTile != null) {
        console.log(' board component onKeyClick updating tile with ' + k);
        firstEmptyTile.value = k;
      // all letters filled already, do nothing
      } else {
        console.log(' board component onKeyClick all tiles filled');
      }
    }
  }

  ngOnInit(): void {
    this.turns = this.gameState.getTurns();
  }
  
}

