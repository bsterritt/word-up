import { Injectable } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { Tile } from './tile/tile';
import { LetterStateService } from './letter-state.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WordCheckerService {

  constructor(private letterStates: LetterStateService, private http: HttpClient) { }

  randomWord!: String;

  answers:String[] = [];
  answersInitialized: Boolean = false;


 // checkedLetters:  Map<String, String>  = new Map<String, String>();

  checkTiles(tileSet : Tile []): Boolean {
    let allMatched = true;
    // save this if its been Missed
   // this.randomWord || this.saveRandomWord();
    const answerLetters = this.randomWord.split("");
    tileSet.forEach((tile: Tile, idx: number) => {
      const tileValue = tile.value.toLowerCase();

      console.log(`checking letter # ${idx} which is $tileValue}`);

      // tileLength does not match answer word length (should never happen)
      if (!answerLetters[idx]) {
        console.warn(" tileLength does not match answer word length!");
        allMatched = false;
        return;
      }

      console.log(`checking letter # ${idx} against ${answerLetters[idx]}`);
      

      // exact match
      if ( tileValue == answerLetters[idx] ) {
        console.log(`match! on letter ${idx}`);
        //tile.colour = "green";
          tile.state = this.letterStates.MATCHED;
      // not an exact match
      } else {
        allMatched = false;
        if ( answerLetters.includes(tileValue) ) {
          console.log(`match! on letter ${tileValue}`);
          //tile.colour = "yellow";
          tile.state = this.letterStates.PRESENT;
        } else {
          console.log(`${tileValue} does not exist in word`);
          tile.state = this.letterStates.MISSING;
        }
      }

      // save the info of this letter to be used on keyboard
     // this.checkedLetters.set(tile.value,tile.state);

      this.letterStates.setLetterState(tile.value,tile.state);
    });
    return allMatched;
  }

  getAnswers(): Observable<String[]> {
    return this.http.get<String[]>('/app/answers');
  }

  saveRandomWord(wordReadyObserver: Observer<any> ):  void {

    // don't have words yet, fetch from HTTP
    if (!this.answersInitialized) {
        this.getAnswers().subscribe( (answers : String[]) => {
          this.answers = answers;
          this.answersInitialized = true;
          this.randomWord = this.getRandomWord();
          console.log("the secret game word is " + this.randomWord);    
          wordReadyObserver.complete();      
        });
    // have words already, notify
    } else {
      this.randomWord = this.getRandomWord();
      console.log("the secret game word is " + this.randomWord); 
      wordReadyObserver.complete();    
    }

    
  }

  getRandomWord(): String {

    return this.answers[ Math.floor(Math.random() * this.answers.length) ];
  }

  // TODO: put these somewhere nicer

  
}
