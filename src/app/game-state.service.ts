import { Injectable } from '@angular/core';
import { Tile } from './tile/tile';
import { UserMessageService } from './user-message.service';
import { WordCheckerService } from './word-checker.service';
import { LetterStateService } from './letter-state.service';

export interface GameInfo {
  result: string,
  turns: string
}

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  constructor(
    private letterStates: LetterStateService,
    private msgService : UserMessageService, 
    private wordChecker : WordCheckerService,   
  ) { }

  wordLength: number = 5;
  turnLength: number = 6;
  currentTurn: number = 0;

  PLAYING: String = "playing";
  WON: String = "won";
  LOST: String = "lost";

  STORAGEKEY : string = 'gameHistory';
  GAMEDELIMITER: string = ",";
  INFODELIMITER: string = ":";

  currentState: String = this.PLAYING;

  getPriorGamesAsArray(): String [] {
    let gameHistory = localStorage.getItem(this.STORAGEKEY);

    return  !!gameHistory ? gameHistory.split(this.GAMEDELIMITER) : [];
  }

  // game history storage
  saveGame(state: String, endedOnTurn : number) {
    let gameRecord =  state + this.INFODELIMITER + (endedOnTurn + 1);

    let gameHistory = localStorage.getItem(this.STORAGEKEY);

    let priorGames = this.getPriorGamesAsArray();

    priorGames.push(gameRecord);

    localStorage.setItem(this.STORAGEKEY,priorGames.join(this.GAMEDELIMITER));
  }

  getGameInfo(): GameInfo[] {
    let priorGames = this.getPriorGamesAsArray();
    return priorGames.map(priorGame => {
      return {
        result: priorGame.split(this.INFODELIMITER)[0],
        turns: priorGame.split(this.INFODELIMITER)[1]
      }
    }); 
  }

  getWinTotal(): number {
    return this.getGameInfo().filter(gameInfo => gameInfo.result == this.WON ).length;
  }

  getLossTotal(): number {
    return this.getGameInfo().filter(gameInfo => gameInfo.result == this.LOST ).length;
  }

  getWinRate(): number {
    return this.getWinTotal() / this.getGameInfo().length;
  }

  // game functions
  endGame( didWin : Boolean ) {
    if ( didWin ) {
      this.currentState = this.WON;
      this.msgService.showMessage('You WIN!');
    } else {
      this.currentState = this.LOST;
      this.msgService.showMessage('Game Over!');
    }

    this.saveGame(this.currentState, this.currentTurn);

    

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
