import { Component, OnInit } from '@angular/core';
import { GameHistoryService } from '../game-history.service';
import { GameStateService } from '../game-state.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass']
})
export class StatsComponent implements OnInit {

  constructor(private gameHistory : GameHistoryService, private gameState: GameStateService ) { }
  // gameInfo 
  wins!: number;
  losses!: number;
  winRate!: number;
  winStreak!: number;
  bestWinStreak!: number;
  guessDistribution: number[] = [];

  didWin: Boolean = false;
  didLose: Boolean = false;

  fillBars: Boolean = false;

  startNewGame() {
    this.gameState.startNewGame();
  }

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

  getGuessDistributionPct( guessAmount: number ): number {
    let highestGuessAmount = 0;
    this.guessDistribution.forEach(amt => {
      highestGuessAmount = Math.max(highestGuessAmount,amt);
    });
    return guessAmount / highestGuessAmount;
  }

  ngOnInit(): void {
    this.didWin = this.gameState.didWin();
    this.didLose = this.gameState.didLose();

    this.updateGameHistory();

    
    setTimeout(() => {
      this.fillBars = true;
    },500);
  }

}
