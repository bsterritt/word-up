import { Injectable } from '@angular/core';

export interface GameInfo {
  result: string,
  turns: string
}

@Injectable({
  providedIn: 'root'
})
export class GameHistoryService {
  constructor(  ) { }

  // game history storage
  STORAGEKEY : string = 'gameHistory';
  GAMEDELIMITER: string = ",";
  INFODELIMITER: string = ":";

  WINTOKEN: string = "";
  LOSSTOKEN: string = "";

  getPriorGamesAsArray(): String [] {
    let gameHistory = localStorage.getItem(this.STORAGEKEY);

    return  !!gameHistory ? gameHistory.split(this.GAMEDELIMITER) : [];
  }

  
  saveGame(state: String, endedOnTurn : number) {
    let gameRecord =  state + this.INFODELIMITER + (endedOnTurn + 1);

    let priorGames = this.getPriorGamesAsArray();

    priorGames.push(gameRecord);

    localStorage.setItem(this.STORAGEKEY,priorGames.join(this.GAMEDELIMITER));
  }

  getAllGameInfo(): GameInfo[] {
    let priorGames = this.getPriorGamesAsArray();
    return priorGames.map(priorGame => {
      return {
        result: priorGame.split(this.INFODELIMITER)[0],
        turns: priorGame.split(this.INFODELIMITER)[1]
      }
    }); 
  }

  private getGamesWithResult(result: String): number {
    return this.getAllGameInfo().filter(gameInfo => gameInfo.result == result ).length;

  }

  setWinToken(token : string): void {
    this.WINTOKEN = token;
  }

  setLossToken(token : string): void {
    this.LOSSTOKEN = token;
  }

  getWinTotal(): number {
    return this.getGamesWithResult(this.WINTOKEN);
  }

  getLossTotal(): number {
    return this.getGamesWithResult(this.LOSSTOKEN);
  }

  getWinRate(): number {
    return this.getWinTotal() / this.getAllGameInfo().length;
  }

  getWinStreak(): number {
    let winStreak = 0;
    let priorGames = this.getAllGameInfo();
    let lastLoss = priorGames.reverse().findIndex(gameInfo => gameInfo.result == this.LOSSTOKEN );
    return priorGames.length  - Math.abs(lastLoss - priorGames.length);
  }

  getBestWinStreak(): number {
    let bestStreak = 0;
    let currentStreak = 0;
    this.getAllGameInfo().forEach(gameInfo => {
      // game was lost
      if (gameInfo.result == this.LOSSTOKEN) {
        currentStreak = 0;
      } else {
        currentStreak++;
        bestStreak = Math.max(bestStreak,currentStreak);
      }
    });

    return bestStreak;
  }

  getGuessCountInstances(guessCount : number) {
    return this.getAllGameInfo().filter(gameInfo => gameInfo.turns == guessCount.toString() ).length;
  }
  
}
