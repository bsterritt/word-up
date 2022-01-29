import { Component, OnInit } from '@angular/core';
import { GameStateService } from './game-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'word-up';

  constructor(
    private gameState : GameStateService
  ) {

  }



  ngOnInit(): void {
    // save the secret answer word
    this.gameState.startNewGame();
  }
}
