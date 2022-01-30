import { Injectable } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators'
import { Tile } from './tile/tile';
import { LetterStateService } from './letter-state.service';
import { ApiServiceService, checkAnswerResponse } from './api-service.service';


@Injectable({
  providedIn: 'root'
})
export class WordCheckerService {

  constructor(private letterStates: LetterStateService, private api: ApiServiceService) { }

  randomWord!: String;

  answers:String[] = [];
  answersInitialized: Boolean = false;

  checkTiles(tileSet : Tile []) {
    let word = tileSet.map(tile => tile.value.toLowerCase()).join("");

    let tilesCheckedObservable = new Observable<Tile>((observer) => {
      this.api.fetchAnswerMatchInfo( word ).subscribe( ( answerCheckInfo: checkAnswerResponse  ) => {
        console.log("answer match API retruned info",answerCheckInfo);
        tileSet.forEach((tile,idx) => {
          tile.state = answerCheckInfo.matchInfo[idx];
          this.letterStates.setLetterState(tile.value,tile.state);
          console.log("tile state updated",tile);
          observer.next(tile);
        });
        
        console.log("match info FINISHED!");
        observer.complete();
      });     
       
    });
    return tilesCheckedObservable;
  }

  // TODO: put these somewhere nicer

  
}
