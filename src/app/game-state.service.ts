import { Injectable } from '@angular/core';
import { Tile } from './tile/tile';
import { UserMessageService } from './user-message.service';
import { WordCheckerService } from './word-checker.service';
import { GameHistoryService } from './game-history.service';
import { LetterStateService } from './letter-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer, Observable } from 'rxjs';
import { ApiServiceService, checkAnswerResponse } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  PLAYING: string = "playing";
  WON: string = "won";
  LOST: string = "lost";
  STARTING: string = "starting";

  currentState: string = this.STARTING;

  wordLength: number = 5;
  turnLength: number = 6;
  currentTurn: number = 0;

  turns = new Array(this.turnLength);

  didWin(): boolean {
    return this.currentState == this.WON;
  } 
  didLose(): boolean {
    return this.currentState == this.LOST;
  } 

  isPlaying(): boolean {
    return this.currentState == this.PLAYING;
  }

  constructor(
    private api: ApiServiceService,
    private wordChecker : WordCheckerService,   
    private gameHistory : GameHistoryService,
    private letterState : LetterStateService,
    private router : Router
  ) { 
    this.gameHistory.setWinToken(this.WON);
    this.gameHistory.setLossToken(this.LOST);
    this.initTurns();
  }

  initTurns() {
    // poopulate the runs with empty tiles
    this.turns = new Array(this.turnLength);

    for (var j = 0; j <  this.turnLength; j++) {
      let turn: Tile[] = [];
      for (var i = 0; i <  this.wordLength; i++) {
        turn.push(new Tile());
      }
      
      this.turns[j] = turn;
    }    
  }

  getTurns() {
    return this.turns;
  }

  // game functions
  endGame( didWin : Boolean ): void {
    if ( didWin ) {
      this.currentState = this.WON;
    } else {
      this.currentState = this.LOST;
    }
    this.gameHistory.saveGame(this.currentState, this.currentTurn);
    this.router.navigate(['stats']);
  }

  startNewGame( externalGameStartObserver? : Observer<any> ) {
    this.currentState = this.STARTING;

    const gameStartObserver : Observer<any> = {
      next: () => console.log('gameStartObserver got a next value: '),
      error: (err: Error) => console.error('gameStartObserver got an error: ' + err),
      complete: () => {
        console.log('gameStartObserver got a complete notification.  ready to play!');
        
        this.currentTurn = 0;
        // clear/ready keyboard
        this.letterState.clearLetterStates();
        // clear/ready guessed letters
        this.initTurns();
        // set game state as ready/playing
        this.currentState = this.PLAYING;

        // go to main game board
        this.router.navigate(['']);     
        
        // notify an extrnal observer if passed
        if (externalGameStartObserver != null) {
          externalGameStartObserver.complete();
        }
      }
    };    

    // call to server to set a new game word
    this.api.saveRandomWord(gameStartObserver);
  }

  goToNextTurn( turn : Tile[]) {
    
    this.wordChecker.checkTiles(turn).subscribe({
      error : (err: Error) => {
        console.log("wordChecker.checkTilesAync ERROR!",err)
      },
      next: ( tile : Tile) => {
        console.log("wordChecker.checkTilesAync NEXT!", tile.state);
      },
      complete: () => {
        console.log("wordChecker.checkTilesAync COMPLETE!");
        
        if (turn.every(tile => tile.state == this.letterState.MATCHED)) {
          this.endGame(true);

        } else if (turn.every(tile => tile.state == this.letterState.ERROR)) {
          alert("Invalid Word");
        // not a winner
        } else {
          // more turns
          if (this.isLastTurn()) {
            this.endGame(false);
          // no more turns
          } else {
            this.currentTurn++;
          }
        }         
      },
    });
  }

  isLastTurn(): Boolean {
    return this.currentTurn == this.turnLength -1;
  }
}
