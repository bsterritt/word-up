import { Injectable } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { environment } from  '../environments/environment';

export interface checkAnswerResponse {
  status : string,
  answer: string,
  message: string,
  matchInfo: string[] 
} 

export interface checkWordResponse {
  status : string,
  word: string,
  message: string,
  isWord: boolean
} 

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  apiRoot: string = "/api";

  // fetch a single randow answer : NO LONGER USED
  getAnswer(): Observable< { answer: string }> {
    const answerApiPath = `${this.apiRoot}/answer`;
    console.log(`fetching random answer from ${answerApiPath}`)
    return this.http.get< { answer: string }>(answerApiPath);
  }

  // fetch all possible answers : NO LONGER USED
  getAnswers(): Observable<String[]> {
   const answersApiPath = `${this.apiRoot}/answers`;
   console.log(`fetching answers from ${answersApiPath}`)
   return this.http.get<String[]>(answersApiPath);
  }
  // fetch info about whther an answer matches the secret answer
  checkIsWord( word : string): Observable<checkWordResponse> {
    const checkWordApiPath = `${this.apiRoot}/checkWord/${word}`;
    console.log(`fetching answer info from ${checkWordApiPath}`);
    if (environment.production) {
      return this.http.get<checkWordResponse>(checkWordApiPath);   
    // fake the check answer service in local
    } else {
      let fakeObservable = new Observable<checkWordResponse>((observer) => {

        observer.next(
          {"status":"SUCCESS","word": word,"message":"Successful Word Check","isWord":false}
        );
        observer.complete();
      });
      return fakeObservable;
    }    

  }
  // fetch info about whther an answer matches the secret answer
  fetchAnswerMatchInfo( answer : string): Observable<checkAnswerResponse> {
    const checkAnswerApiPath = `${this.apiRoot}/checkAnswer/${answer}`;
    console.log(`fetching answer info from ${checkAnswerApiPath}`);
    if (environment.production) {
      return this.http.get<checkAnswerResponse>(checkAnswerApiPath);   
    // fake the check answer service in local
    } else {
      let fakeObservable = new Observable<checkAnswerResponse>((observer) => {
        let fakeAnswer = "dummy";
        //  let matchInfo = ["missing","missing","missing","present","missing"];
        let matchInfo = new Array(5).fill("error");
        
        if (answer == fakeAnswer) {
          matchInfo = new Array(5).fill("matched");
        }
        observer.next(
          {"status":"SUCCESS","answer":"loyal","message":"Successful Answer Test","matchInfo":matchInfo}
        );
        observer.complete();
      });
      return fakeObservable;
    }
  }

  // set the secret word at beginnning of a game
  saveRandomWord(wordReadyObserver: Observer<any> ):  void {
    const saveAnswerApiPath = `${this.apiRoot}/saveAnswer`;
    this.http.get< { status: string }>(saveAnswerApiPath).subscribe( (answerObj : { status: string }) => {
      console.log("Save Answer is Done",answerObj);    
      wordReadyObserver.complete();      
    });     
  }  
}
