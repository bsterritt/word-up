import { Injectable } from '@angular/core';
import { Tile } from './tile/tile';
import { UserMessageService } from './user-message.service';
import { WordCheckerService } from './word-checker.service';
import { GameHistoryService } from './game-history.service';


@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  PLAYING: String = "playing";
  WON: string = "won";
  LOST: string = "lost";
  
  constructor(
    private msgService : UserMessageService, 
    private wordChecker : WordCheckerService,   
    private gameHistory : GameHistoryService
  ) { 
    this.gameHistory.setWinToken(this.WON);
    this.gameHistory.setLossToken(this.LOST);
  }

  wordLength: number = 5;
  turnLength: number = 6;
  currentTurn: number = 0;





  currentState: String = this.PLAYING;



  // game functions
  endGame( didWin : Boolean ) {
    if ( didWin ) {
      this.currentState = this.WON;
      this.msgService.showMessage('You WIN!');
    } else {
      this.currentState = this.LOST;
      this.msgService.showMessage('Game Over!');
    }

    this.gameHistory.saveGame(this.currentState, this.currentTurn);

    

  }

  goToNextTurn( turn : Tile[]): Boolean {
    // winner
    if (this.wordChecker.checkTiles(turn)) {
      this.endGame(true);
      return true;
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

    return false;
  }

  isLastTurn(): Boolean {
    return this.currentTurn == this.turnLength -1;
  }
}
