import { Injectable } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { Tile } from './tile/tile';
import { LetterStateService } from './letter-state.service';

interface checkAnswerResponse {
  status : string,
  answer: string,
  message: string,
  matchInfo: string[] 
} 

@Injectable({
  providedIn: 'root'
})
export class WordCheckerService {

  constructor(private letterStates: LetterStateService, private http: HttpClient) { }

  randomWord!: String;

  answers:String[] = [];
  answersInitialized: Boolean = false;

  apiRoot: string = "http://localhost:8000/api";




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
   const answersApiPath = `${this.apiRoot}/answers`;
   console.log(`fetching answers from ${answersApiPath}`)
   return this.http.get<String[]>(answersApiPath);
  }

  getAnswer(): Observable< { answer: string }> {
    const answerApiPath = `${this.apiRoot}/answer`;
    console.log(`fetching random answer from ${answerApiPath}`)
    return this.http.get< { answer: string }>(answerApiPath);
  }

  fetchAnswerMatchInfo( answer : string): Observable<checkAnswerResponse> {
    const checkAnswerApiPath = `${this.apiRoot}/checkAnswer/${answer}`;
    console.log(`fetching answer info from ${checkAnswerApiPath}`)
    return this.http.get<checkAnswerResponse>(checkAnswerApiPath);    
  }

  checkTilesAync(tileSet : Tile []) {
    let tilesCheckedObservable = new Observable<Tile>((observer) => {
      this.fetchAnswerMatchInfo( tileSet.map(tile => tile.value.toLowerCase()).join("") ).subscribe( ( answerCheckInfo: checkAnswerResponse  ) => {
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

  saveRandomWord(wordReadyObserver: Observer<any> ):  void {

    /*
    // don't have words yet, fetch from HTTP
    if (!this.answersInitialized) {
        this.getAnswers().subscribe( (answers : String[]) => {
          this.answers = answers;
          this.answersInitialized = true;
          this.randomWord = this.getRandomWord();
          console.log("the NEW secret game word is " + this.randomWord);    
          wordReadyObserver.complete();      
        });
    // have words already, notify
    } else {
      this.randomWord = this.getRandomWord();
      console.log("the OLD secret game word is " + this.randomWord); 
      wordReadyObserver.complete();    
    }
    */
    // don't have words yet, fetch from HTTP
      this.getAnswer().subscribe( (answerObj : { answer: string }) => {
        this.randomWord = answerObj.answer;
        console.log("the NEW secret game word is " + this.randomWord);    
        wordReadyObserver.complete();      
      });

    
  }

  getRandomWord(): String {

    return this.answers[ Math.floor(Math.random() * this.answers.length) ];
  }

  // TODO: put these somewhere nicer

  
}
